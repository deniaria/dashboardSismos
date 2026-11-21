import { Box, Stack, Typography } from '@mui/material';
import type { ChartPoint } from '../types/earthquake';
export default function ColumnChart({ data }: { data: ChartPoint[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return <Stack direction="row" spacing={2} alignItems="end" justifyContent="space-around" sx={{ height: 220, pt: 1 }}>
    {data.map(({ label, value }) => <Stack key={label} alignItems="center" justifyContent="end" sx={{ height: '100%', flex: 1, minWidth: 0 }}>
      <Typography variant="caption" fontWeight={700}>{value.toLocaleString('es-EC')}</Typography>
      <Box sx={{ width: '65%', maxWidth: 110, height: `${Math.max(value / max * 145, 2)}px`, bgcolor: '#386bdf', borderRadius: '5px 5px 0 0' }} />
      <Typography variant="caption" textAlign="center" sx={{ fontSize: 10, mt: 1 }}>{label}</Typography>
    </Stack>)}
  </Stack>;
}
