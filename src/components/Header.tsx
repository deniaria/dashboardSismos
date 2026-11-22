import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';

export default function Header({ title }: { title: string }) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'linear-gradient(100deg, #4c1d95 0%, #6d28d9 55%, #8b5cf6 100%)',
      }}
    >
      <Toolbar sx={{ gap: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '10px',
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'rgba(255,255,255,.14)',
            border: '1px solid rgba(255,255,255,.28)',
          }}
        >
          <PublicIcon sx={{ color: '#a5f3d0', fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            Actividad sísmica mundial · USGS
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
