import { Box, Typography } from '@mui/material';
import type { ChartPoint } from '../types/earthquake';

const COLORS = ['#2dd4bf', '#14b8a6', '#8b5cf6', '#6d28d9', '#a21caf', '#c026d3'];

export default function BarChart({ data }: { data: ChartPoint[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        gap: { xs: 1, sm: 2 },
        height: 240,
        pt: 3,
        pb: 1,
        width: '100%',
      }}
    >
      {data.map(({ label, value }, i) => {
        const color = COLORS[i % COLORS.length];
        return (
          <Box
            key={label}
            sx={{
              flex: 1,
              minWidth: 0,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color,
                mb: 0.5,
                fontSize: { xs: '0.65rem', sm: '0.75rem' },
              }}
            >
              {value.toLocaleString('es-EC')}
            </Typography>

            <Box
              sx={{
                width: '75%',
                maxWidth: 65,
                height: `${Math.max((value / max) * 160, 3)}px`,
                background: `linear-gradient(180deg, ${color} 0%, ${color}cc 100%)`,
                borderRadius: '4px 4px 0 0',
                boxShadow: `0 4px 12px ${color}40`,
                transition: 'height 0.3s ease',
              }}
            />

            <Typography
              variant="caption"
              sx={{
                mt: 1,
                color: '#7c7391',
                fontWeight: 700,
                textAlign: 'center',
                fontSize: { xs: '0.6rem', sm: '0.75rem' },
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
