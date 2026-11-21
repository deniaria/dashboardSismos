import { Stack, TextField } from '@mui/material';
import type { MagnitudeRange } from '../types/earthquake';
interface Props { magnitudeRange: MagnitudeRange; onMagnitudeChange: (next: MagnitudeRange) => void }
export default function MagnitudeFilter({ magnitudeRange, onMagnitudeChange }: Props) {
  return <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
    <TextField label="Magnitud mínima" type="number" size="small" value={magnitudeRange.min}
      onChange={(e) => onMagnitudeChange({ ...magnitudeRange, min: Number(e.target.value) })}
      slotProps={{ htmlInput: { step: .1 } }} fullWidth />
    <TextField label="Magnitud máxima" type="number" size="small" value={magnitudeRange.max}
      onChange={(e) => onMagnitudeChange({ ...magnitudeRange, max: Number(e.target.value) })}
      slotProps={{ htmlInput: { step: .1 } }} fullWidth />
  </Stack>;
}
