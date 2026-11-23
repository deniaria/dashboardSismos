import { Box, Card, CardContent, Typography } from '@mui/material';

interface Props {
  title: string;
  value: string | number;
  unit: string;
  accent?: string;
  tint?: string;
}

export default function KPICard({
  title,
  value,
  unit,
  accent = '#6d28d9',
  tint = '#f3edfd',
}: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        borderRadius: 1,
        position: 'relative',
        overflow: 'hidden',
        bgcolor: tint,
        borderColor: '#e9e3f2',
        boxShadow: '0 8px 22px rgba(76, 29, 149, .07)',
        transition: 'transform .2s ease, box-shadow .2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 14px 28px rgba(76, 29, 149, .14)',
        },
      }}
    >
      <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, bgcolor: accent }} />
      <CardContent sx={{ pl: 2.5 }}>
        <Typography
          variant="body2"
          sx={{
            color: '#7c7391',
            fontWeight: 700,
            letterSpacing: 0.4,
            textTransform: 'uppercase',
            fontSize: 11,
          }}
        >
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={800} sx={{ mt: 1, color: accent }}>
          {value}{' '}
          <Typography component="span" variant="body2" sx={{ color: '#7c7391' }}>
            {unit}
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
}
