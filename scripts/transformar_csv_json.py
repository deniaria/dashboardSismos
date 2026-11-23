"""Convierte el feed USGS de CSV a JSON, conservando 22 campos y validando tipos."""
import csv
import json
import math
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSV_PATH = ROOT / 'data' / 'all_month.csv'
JSON_PATH = ROOT / 'data' / 'all_month.json'
REPORT_PATH = ROOT / 'evidencias' / 'validacion.json'

NUMERIC_FIELDS = {'latitude', 'longitude', 'depth', 'mag', 'nst', 'gap', 'dmin', 'rms',
                  'horizontalError', 'depthError', 'magError', 'magNst'}
INTEGER_FIELDS = {'nst', 'magNst'}
DATE_FIELDS = {'time', 'updated'}
REQUIRED_FIELDS = {'time', 'latitude', 'longitude', 'depth', 'mag', 'place', 'status'}


def transform_value(key, raw, row_num, errors):
    value = raw.strip() if raw is not None else ''
    if not value:
        return None
    if key in DATE_FIELDS:
        try:
            # Conservar UTC con formato ISO 8601 uniforme, terminación Z.
            dt = datetime.fromisoformat(value.replace('Z', '+00:00'))
            if dt.tzinfo is None:
                raise ValueError('fecha sin zona horaria')
            return dt.astimezone(timezone.utc).isoformat(timespec='milliseconds').replace('+00:00', 'Z')
        except ValueError:
            errors.append(f'Fila {row_num}: {key} tiene fecha inválida: {value!r}')
            return None
    if key in NUMERIC_FIELDS:
        try:
            number = float(value)
            if not math.isfinite(number):
                raise ValueError('no finito')
            if key in INTEGER_FIELDS:
                if not number.is_integer():
                    raise ValueError('no es entero')
                return int(number)
            return number
        except ValueError:
            errors.append(f'Fila {row_num}: {key} no es numérico válido: {value!r}')
            return None
    return value


def main():
    errors = []
    blanks = Counter()
    with CSV_PATH.open(encoding='utf-8-sig', newline='') as file:
        reader = csv.DictReader(file)
        fields = reader.fieldnames or []
        if not fields:
            raise ValueError('Archivo CSV sin cabeceras')
        records = []
        for row_number, row in enumerate(reader, 2):
            if None in row:
                errors.append(f'Fila {row_number}: columnas adicionales')
            record = {}
            for key in fields:
                raw = row.get(key)
                if raw is None or not raw.strip():
                    blanks[key] += 1
                record[key] = transform_value(key, raw, row_number, errors)
            records.append(record)

    if not records:
        raise ValueError('CSV sin registros')
    ids = [r.get('id') for r in records]
    duplicated_ids = len(ids) - len(set(ids))
    if duplicated_ids:
        errors.append(f'Hay {duplicated_ids} identificadores de evento repetidos')
    for i, r in enumerate(records, 2):
        for key in REQUIRED_FIELDS - {'place'}:  # USGS admite place vacío; se convierte a null.
            if r.get(key) is None:
                errors.append(f'Fila {i}: campo requerido {key} vacío/inválido')
        if r['latitude'] is not None and not -90 <= r['latitude'] <= 90:
            errors.append(f'Fila {i}: latitud fuera de rango')
        if r['longitude'] is not None and not -180 <= r['longitude'] <= 180:
            errors.append(f'Fila {i}: longitud fuera de rango')
    if errors:
        raise ValueError('Errores de validación:\n' + '\n'.join(errors[:30]))

    JSON_PATH.write_text(json.dumps(records, ensure_ascii=False, indent=2, allow_nan=False) + '\n', encoding='utf-8')
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    loaded = json.loads(JSON_PATH.read_text(encoding='utf-8'))
    assert len(loaded) == len(records)
    assert all(set(r) == set(fields) for r in loaded)
    report = {
        'archivo_origen': str(CSV_PATH.relative_to(ROOT)),
        'archivo_resultado': str(JSON_PATH.relative_to(ROOT)),
        'total_registros_csv': len(records),
        'total_registros_json': len(loaded),
        'cantidad_columnas': len(fields),
        'campos_numericos': sorted(NUMERIC_FIELDS),
        'campos_temporales': sorted(DATE_FIELDS),
        'campos_texto': sorted(set(fields) - NUMERIC_FIELDS - DATE_FIELDS),
        'valores_vacios_por_campo': dict(sorted(blanks.items())),
        'id_duplicados': duplicated_ids,
        'errores_de_validacion': len(errors),
        'fecha_minima_utc': min(r['time'] for r in records),
        'fecha_maxima_utc': max(r['time'] for r in records),
        'magnitud_maxima': max(r['mag'] for r in records if r['mag'] is not None),
        'profundidad_promedio_km': round(sum(r['depth'] for r in records if r['depth'] is not None) / sum(r['depth'] is not None for r in records), 3),
        'resultado': 'VALIDADO',
    }
    REPORT_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
