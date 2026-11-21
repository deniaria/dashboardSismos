import { Box, Typography } from '@mui/material';
import type { ChartPoint } from '../types/earthquake';
export default function LineChart({ data }: { data: ChartPoint[] }) {
  if (!data.length) return <Typography color="text.secondary">No hay datos para el intervalo seleccionado.</Typography>;
  const width = 720, height = 220, padding = 24;
  const max = Math.max(...data.map((d) => d.value), 1);
  const points = data.map((d, i) => {
    const x = padding + (i / Math.max(data.length - 1, 1)) * (width - 2 * padding);
    const y = height - padding - (d.value / max) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');
  return <Box>
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Gráfico de línea de sismos por día" style={{ width: '100%', height: 210 }}>
      {[0, .25, .5, .75, 1].map((fraction) => <line key={fraction} x1={padding} x2={width - padding}
        y1={height - padding - fraction * (height - 2 * padding)} y2={height - padding - fraction * (height - 2 * padding)} stroke="#e5ebf3" />)}
      <polyline points={points} fill="none" stroke="#6655ce" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
    <Box display="flex" justifyContent="space-between"><Typography variant="caption">{data[0].label}</Typography><Typography variant="caption">{data[data.length - 1].label}</Typography></Box>
  </Box>;
}
