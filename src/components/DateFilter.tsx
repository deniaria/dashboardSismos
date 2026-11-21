import { Stack, TextField } from '@mui/material';
import type { DateRange } from '../types/earthquake';
interface Props { dateRange: DateRange; onDateChange: (next: DateRange) => void }
export default function DateFilter({ dateRange, onDateChange }: Props) {
  return <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
    <TextField label="Desde" size="small" type="date" value={dateRange.start}
      onChange={(e) => onDateChange({ ...dateRange, start: e.target.value })}
      slotProps={{ inputLabel: { shrink: true } }} fullWidth />
    <TextField label="Hasta" size="small" type="date" value={dateRange.end}
      onChange={(e) => onDateChange({ ...dateRange, end: e.target.value })}
      slotProps={{ inputLabel: { shrink: true } }} fullWidth />
  </Stack>;
}
