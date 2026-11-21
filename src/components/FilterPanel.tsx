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
  const content = <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'end' }}>
    <Box sx={{ flex: 1 }}><Typography variant="subtitle2" gutterBottom>Intervalo de fechas</Typography>
      <DateFilter dateRange={dateRange} onDateChange={onDateChange} /></Box>
    <Box sx={{ flex: 1 }}><Typography variant="subtitle2" gutterBottom>Rango de magnitud</Typography>
      <MagnitudeFilter magnitudeRange={magnitudeRange} onMagnitudeChange={onMagnitudeChange} /></Box>
    <Button variant="outlined" onClick={onReset}>Restablecer</Button>
  </Stack>;
  return mobile ? <Accordion expanded={isOpen} onChange={onToggle} sx={{ borderRadius: '12px !important' }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>Filtros</AccordionSummary>
    <AccordionDetails>{content}</AccordionDetails>
  </Accordion> : <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>{content}</Paper>;
}
