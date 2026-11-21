import { Card, CardContent, Typography } from '@mui/material';
interface Props { title: string; value: string | number; unit: string }
export default function KPICard({ title, value, unit }: Props) {
  return <Card variant="outlined" sx={{ height: '100%', borderRadius: 3 }}>
    <CardContent><Typography variant="body2" color="text.secondary">{title}</Typography>
      <Typography variant="h4" color="primary" fontWeight={800} sx={{ mt: 1 }}>{value} <Typography component="span" variant="body2">{unit}</Typography></Typography>
    </CardContent>
  </Card>;
}
