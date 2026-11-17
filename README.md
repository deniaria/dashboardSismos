# SISMO DATA — Sprint 1: CSV a JSON

Proyecto 03 · Desarrollo de Aplicaciones Web y Móviles

**Integrantes:** Denisse Arias y Jaylind Chancay

## Objetivo

Transformar el conjunto de datos de sismos en formato CSV a JSON, validando variables categóricas, numéricas y temporales, para prepararlo para su almacenamiento en Firebase y su uso posterior en el dashboard.

## Fuente de los datos

USGS Earthquake Catalog, feed `all_month` (sismos del último mes). Datos descargados el 2026-11-16.

## Contenido

| Archivo | Descripción |
|---|---|
| `data/all_month.csv` | Copia del conjunto de datos USGS usado en este Sprint. |
| `data/all_month.json` | Conversión JSON completa (arreglo de objetos). |
| `scripts/transformar_csv_json.py` | Script de transformación y validación en Python, sin dependencias externas. |
| `README.md` | Descripción del proyecto e instrucciones de ejecución. |

## Cómo ejecutar

Requisito: Python 3.9 o superior (no requiere instalar librerías).

Desde la carpeta raíz del repositorio:

```bash
mkdir evidencias
python scripts/transformar_csv_json.py
```

El comando `mkdir evidencias` solo se necesita la primera vez; si la carpeta ya existe, omítelo.

El programa lee `data/all_month.csv` y genera (o reemplaza):

- `data/all_month.json`: el archivo JSON convertido.
- `evidencias/validacion.json`: el informe de validación.

El proceso se detiene con un error si detecta fechas o números inválidos, coordenadas fuera de rango, ID repetidos o diferencia entre el número de filas del CSV y del JSON.

## Reglas de transformación

- Se conservan **las 22 columnas originales** del CSV.
- Los campos numéricos pasan a `number`; `nst` y `magNst` pasan a enteros.
- `time` y `updated` quedan como cadenas ISO 8601 en UTC, terminadas en `Z` (JSON no tiene un tipo fecha nativo).
- Los campos categóricos se conservan como cadenas (`string`) y se recortan los espacios al inicio y al final.
- Las celdas vacías se convierten en `null`, sin inventar valores. En este archivo hay un `place` ausente válido.
- El JSON es un arreglo de objetos, fácil de consumir desde React; para Firebase se puede importar o reestructurar según el servicio elegido.

## Resultados de la validación

- Registros CSV: **9850**; objetos JSON: **9850**.
- Campos por objeto: **22**.
- Identificadores duplicados: **0**; errores de validación: **0**.
- Valores faltantes: `horizontalError` 304, `depthError` 162, `magError` 10, `dmin` 6 y `place` 1.
- Periodo cubierto: **2026-10-17T20:43:53.900Z** a **2026-11-16T20:30:39.670Z**.
