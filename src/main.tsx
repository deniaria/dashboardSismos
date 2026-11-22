import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';

const theme = createTheme({
  palette: {
    primary: { main: '#6d28d9', light: '#a78bfa', dark: '#4c1d95' },
    secondary: { main: '#0f766e' },
    background: { default: '#f7f5fc', paper: '#ffffff' },
    text: { primary: '#2d1b4e', secondary: '#7c7391' },
    divider: '#e9e3f2',
  },
  typography: { fontFamily: '"Trebuchet MS", "Segoe UI", Arial, sans-serif' },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 700 } } },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><ThemeProvider theme={theme}><CssBaseline /><App /></ThemeProvider></React.StrictMode>);
