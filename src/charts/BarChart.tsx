import { Box, Stack, Typography } from '@mui/material';
import type { ChartPoint } from '../types/earthquake';
export default function BarChart({ data }: { data: ChartPoint[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return <Stack spacing={1.3}>
    {data.map(({ label, value }) => <Box key={label}>
      <Box display="flex" justifyContent="space-between"><Typography variant="caption">{label}</Typography><Typography variant="caption">{value.toLocaleString('es-EC')}</Typography></Box>
      <Box sx={{ height: 16, bgcolor: '#eef2fa', borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ width: `${100 * value / max}%`, height: '100%', bgcolor: '#386bdf', borderRadius: 3 }} />
      </Box>
    </Box>)}
  </Stack>;
}
