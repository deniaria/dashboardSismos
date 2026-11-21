import { Box, Paper, Typography } from '@mui/material';
import type { ReactNode } from 'react';
export default function ChartContainer({ title, children }: { title: string; children: ReactNode }) {
  return <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, height: '100%', minWidth: 0 }}>
    <Typography fontWeight={700} color="#0c2746" sx={{ mb: 2 }}>{title}</Typography>
    <Box sx={{ minHeight: 230 }}>{children}</Box>
  </Paper>;
}
