import { Box, Stack, Typography } from '@mui/material';
import type { ChartPoint } from '../types/earthquake';

const COLORS = ['#14b8a6', '#8b5cf6', '#a21caf'];

export default function ColumnChart({ data }: { data: ChartPoint[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <Stack direction="row" spacing={2} alignItems="end" justifyContent="space-around" sx={{ height: 220, pt: 1 }}>
      {data.map(({ label, value }, i) => {
        const color = COLORS[i % COLORS.length];
        return (
          <Stack key={label} alignItems="center" justifyContent="end" sx={{ height: '100%', flex: 1, minWidth: 0 }}>
            <Typography variant="caption" fontWeight={800} sx={{ color }}>{value.toLocaleString('es-EC')}</Typography>
            <Box
              sx={{
                width: '65%',
                maxWidth: 110,
                height: `${Math.max(value / max * 145, 2)}px`,
                background: `linear-gradient(180deg, ${color} 0%, ${color}cc 100%)`,
                borderRadius: '4px 4px 0 0',
                boxShadow: `0 4px 12px ${color}40`,
              }}
            />
            <Typography variant="caption" textAlign="center" sx={{ fontSize: 10, mt: 1, color: '#7c7391', fontWeight: 700 }}>{label}</Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}
