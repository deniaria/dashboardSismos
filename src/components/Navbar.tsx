import { Box, Button } from '@mui/material';

export interface NavItem { label: string; href: string }

export default function Navbar({ items }: { items: NavItem[] }) {
  return (
    <Box
      component="nav"
      aria-label="Secciones del dashboard"
      sx={{
        display: 'flex',
        gap: 1,
        overflowX: 'auto',
        pb: 0.5,
        '&::-webkit-scrollbar': { height: 6 },
        '&::-webkit-scrollbar-thumb': { bgcolor: '#dcd3ef', borderRadius: 3 },
      }}
    >
      {items.map((item) => (
        <Button
          size="small"
          key={item.href}
          component="a"
          href={item.href}
          sx={{
            whiteSpace: 'nowrap',
            color: '#5b3a8f',
            borderRadius: 1,
            '&:hover': { bgcolor: '#efe8fb', color: '#6d28d9' },
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
}
