import { Box, Paper, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
  accent?: string;
}

export default function ChartContainer({ title, children, accent = '#6d28d9' }: Props) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 1,
        height: '100%',
        minWidth: 0,
        borderColor: '#e9e3f2',
        boxShadow: '0 6px 22px rgba(76, 29, 149, .05)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Box sx={{ width: 4, height: 18, borderRadius: 1, bgcolor: accent }} />
        <Typography fontWeight={800} sx={{ color: '#3b0764', fontSize: 15 }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ minHeight: 230 }}>{children}</Box>
    </Paper>
  );
}
