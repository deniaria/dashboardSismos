import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import type { Earthquake } from '../types/earthquake';
import { validNumber } from '../data/process';
export default function DataTable({ records }: { records: Earthquake[] }) {
  return <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
    <TableContainer sx={{ overflowX: 'auto' }}><Table size="small" aria-label="Tabla de registros de sismos" sx={{ minWidth: 790 }}>
      <TableHead sx={{ bgcolor: '#0c2746' }}><TableRow>{['Fecha (UTC)', 'Ubicación', 'Magnitud', 'Prof. (km)', 'Latitud', 'Longitud', 'Estado'].map((h) =>
        <TableCell key={h} sx={{ color: '#fff', fontWeight: 700 }}>{h}</TableCell>)}</TableRow></TableHead>
      <TableBody>{records.slice(0, 20).map((e, i) => <TableRow key={`${e.id ?? e.time}-${i}`} hover>
        <TableCell>{e.time ? new Date(e.time).toLocaleString('es-EC', { timeZone: 'UTC' }) : '—'}</TableCell>
        <TableCell>{e.place ?? 'Sin ubicación'}</TableCell>
        <TableCell>{validNumber(e.mag) ? e.mag.toFixed(1) : '—'}</TableCell>
        <TableCell>{validNumber(e.depth) ? e.depth.toFixed(1) : '—'}</TableCell>
        <TableCell>{validNumber(e.latitude) ? e.latitude.toFixed(3) : '—'}</TableCell>
        <TableCell>{validNumber(e.longitude) ? e.longitude.toFixed(3) : '—'}</TableCell>
        <TableCell>{e.status ?? '—'}</TableCell>
      </TableRow>)}</TableBody>
    </Table></TableContainer>
    <Typography variant="caption" display="block" sx={{ p: 1.5 }}>Se muestran los primeros {Math.min(records.length, 20)} de {records.length.toLocaleString('es-EC')} registros filtrados.</Typography>
  </Paper>;
}
