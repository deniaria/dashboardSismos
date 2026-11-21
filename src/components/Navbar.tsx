import { Box, Button } from '@mui/material';
export interface NavItem { label: string; href: string }
export default function Navbar({ items }: { items: NavItem[] }) {
  return <Box component="nav" aria-label="Secciones del dashboard" sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: .5 }}>
    {items.map((item) => <Button size="small" key={item.href} component="a" href={item.href} sx={{ whiteSpace: 'nowrap' }}>{item.label}</Button>)}
  </Box>;
}
