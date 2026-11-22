import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DateFilter from './DateFilter';
import MagnitudeFilter from './MagnitudeFilter';
import type { DateRange, MagnitudeRange } from '../types/earthquake';

interface Props {
  dateRange: DateRange; magnitudeRange: MagnitudeRange;
  onDateChange: (next: DateRange) => void;
  onMagnitudeChange: (next: MagnitudeRange) => void;
  isOpen: boolean; onToggle: () => void; onReset: () => void;
}

export default function FilterPanel({ dateRange, magnitudeRange, onDateChange, onMagnitudeChange, isOpen, onToggle, onReset }: Props) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const content = (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'end' }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ color: '#6d28d9', fontWeight: 800 }}>Intervalo de fechas</Typography>
        <DateFilter dateRange={dateRange} onDateChange={onDateChange} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ color: '#0f766e', fontWeight: 800 }}>Rango de magnitud</Typography>
        <MagnitudeFilter magnitudeRange={magnitudeRange} onMagnitudeChange={onMagnitudeChange} />
      </Box>
      <Button
        variant="outlined"
        onClick={onReset}
        sx={{
          borderColor: '#0f766e',
          color: '#0f766e',
          borderRadius: 1,
          whiteSpace: 'nowrap',
          '&:hover': { bgcolor: '#e6f7f2', borderColor: '#0f766e' },
        }}
      >
        Restablecer
      </Button>
    </Stack>
  );

  return mobile
    ? (
      <Accordion expanded={isOpen} onChange={onToggle} sx={{ borderRadius: '8px !important', borderColor: '#e9e3f2', bgcolor: '#fff' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#6d28d9' }} />} sx={{ color: '#6d28d9', fontWeight: 800 }}>
          Filtros
        </AccordionSummary>
        <AccordionDetails>{content}</AccordionDetails>
      </Accordion>
    )
    : <Paper variant="outlined" sx={{ p: 2, borderRadius: 1, borderColor: '#e9e3f2' }}>{content}</Paper>;
}
