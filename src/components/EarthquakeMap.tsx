import { Box, Typography } from '@mui/material';
import type { Earthquake } from '../types/earthquake';
import { validNumber } from '../data/process';

const PALETTE = [
  { label: '< 2', color: '#2dd4bf' },
  { label: '2–3.9', color: '#14b8a6' },
  { label: '4–4.9', color: '#8b5cf6' },
  { label: '≥ 5', color: '#c026d3' },
];

function colorFor(mag: number | null): string {
  if (!validNumber(mag)) return '#a78bfa';
  if (mag < 2) return PALETTE[0].color;
  if (mag < 4) return PALETTE[1].color;
  if (mag < 5) return PALETTE[2].color;
  return PALETTE[3].color;
}

export default function EarthquakeMap({ earthquakes }: { earthquakes: Earthquake[] }) {
  const located = earthquakes.filter((e) => validNumber(e.latitude) && validNumber(e.longitude));
  const stride = Math.max(1, Math.ceil(located.length / 1200));
  const sample = located.filter((_, index) => index % stride === 0);
  return (
    <Box>
      <svg
        viewBox="0 0 720 340"
        role="img"
        aria-label="Ubicación esquemática de epicentros por latitud y longitud"
        style={{ width: '100%', display: 'block', background: '#f0ecfa', borderRadius: 8 }}
      >
        {[-120, -60, 0, 60, 120].map((lon) => <line key={lon} x1={(lon + 180) * 2} y1="0" x2={(lon + 180) * 2} y2="340" stroke="#dcd3ef" />)}
        {[-60, -30, 0, 30, 60].map((lat) => <line key={lat} x1="0" y1={(90 - lat) * 340 / 180} x2="720" y2={(90 - lat) * 340 / 180} stroke="#dcd3ef" />)}
        {sample.map((e, index) => (
          <circle
            key={`${e.id ?? 's'}-${index}`}
            cx={(Number(e.longitude) + 180) * 2}
            cy={(90 - Number(e.latitude)) * 340 / 180}
            r={validNumber(e.mag) ? Math.max(1.5, Math.min(5, 1.5 + e.mag * 0.4)) : 1.5}
            fill={colorFor(e.mag)}
            opacity=".8"
            stroke="#ffffff"
            strokeWidth=".6"
          />
        ))}
      </svg>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mt: 1 }}>
        {PALETTE.map(({ label, color }) => (
          <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: color }} />
            <Typography variant="caption" sx={{ color: '#7c7391', fontWeight: 700 }}>mag {label}</Typography>
          </Box>
        ))}
      </Box>
      <Typography variant="caption" color="text.secondary">
        Distribución geográfica esquemática (no incluye contornos continentales). {sample.length.toLocaleString('es-EC')} puntos mostrados de {located.length.toLocaleString('es-EC')} con coordenadas.
      </Typography>
    </Box>
  );
}
