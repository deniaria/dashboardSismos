import { Box, Typography } from '@mui/material';
import type { Earthquake } from '../types/earthquake';
import { validNumber } from '../data/process';
export default function EarthquakeMap({ earthquakes }: { earthquakes: Earthquake[] }) {
  const located = earthquakes.filter((e) => validNumber(e.latitude) && validNumber(e.longitude));
  // Máximo 1200 puntos para mantener el SVG ligero, muestreo repartido sobre los datos filtrados.
  const stride = Math.max(1, Math.ceil(located.length / 1200));
  const sample = located.filter((_, index) => index % stride === 0);
  return <Box>
    <svg viewBox="0 0 720 340" role="img" aria-label="Ubicación esquemática de epicentros por latitud y longitud" style={{ width: '100%', display: 'block', background: '#eaf2fa', borderRadius: 10 }}>
      {[-120, -60, 0, 60, 120].map((lon) => <line key={lon} x1={(lon + 180) * 2} y1="0" x2={(lon + 180) * 2} y2="340" stroke="#ccd9e6" />)}
      {[-60, -30, 0, 30, 60].map((lat) => <line key={lat} x1="0" y1={(90 - lat) * 340 / 180} x2="720" y2={(90 - lat) * 340 / 180} stroke="#ccd9e6" />)}
      {sample.map((e, index) => <circle key={`${e.id ?? 's'}-${index}`}
        cx={(Number(e.longitude) + 180) * 2} cy={(90 - Number(e.latitude)) * 340 / 180}
        r={validNumber(e.mag) ? Math.max(1.5, Math.min(5, 1.5 + e.mag * .4)) : 1.5}
        fill="#6b4acc" opacity=".65" />)}
    </svg>
    <Typography variant="caption" color="text.secondary">
      Distribución geográfica esquemática (no incluye contornos continentales). {sample.length.toLocaleString('es-EC')} puntos mostrados de {located.length.toLocaleString('es-EC')} con coordenadas.
    </Typography>
  </Box>;
}
