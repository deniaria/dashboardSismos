import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
export default function Header({ title }: { title: string }) {
  return <AppBar position="static" elevation={0} sx={{ bgcolor: '#0c2746' }}>
    <Toolbar sx={{ gap: 1.5 }}><PublicIcon /><Box>
      <Typography variant="h6" fontWeight={800}>{title}</Typography>
      <Typography variant="caption" sx={{ opacity: .8 }}>Actividad sísmica mundial · USGS</Typography>
    </Box></Toolbar>
  </AppBar>;
}
