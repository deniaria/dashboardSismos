import { useEffect, useState } from 'react';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import type { Earthquake } from '../types/earthquake';
import { validNumber } from '../data/process';

export default function DataTable({
  records,
}: {
  records: Earthquake[];
}) {
  // Página actual
  const [page, setPage] = useState(0);

  // Cantidad de registros por página
  const [rowsPerPage, setRowsPerPage] = useState(20);

  // Volver a la primera página cuando cambien los filtros
  useEffect(() => {
    setPage(0);
  }, [records]);

  // Obtener los registros de la página seleccionada
  const visibleRecords = records.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Cambiar de página
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // Cambiar cantidad de registros por página
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: '#ffffff',
      }}
    >
      {/* Tabla de registros */}
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table
          size="small"
          aria-label="Tabla de registros de sismos"
          sx={{ minWidth: 790 }}
        >
          {/* Encabezado */}
          <TableHead sx={{ bgcolor: '#0c2746' }}>
            <TableRow>
              {[
                'Fecha (UTC)',
                'Ubicación',
                'Magnitud',
                'Prof. (km)',
                'Latitud',
                'Longitud',
                'Estado',
              ].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: '#ffffff',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Registros */}
          <TableBody>
            {visibleRecords.map((e, i) => (
              <TableRow
                key={`${e.id ?? e.time}-${i}`}
                hover
                sx={{
                  '&:hover': {
                    bgcolor: '#f1f5ff',
                  },
                }}
              >
                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                  {e.time
                    ? new Date(e.time).toLocaleString('es-EC', {
                        timeZone: 'UTC',
                      })
                    : '—'}
                </TableCell>

                <TableCell>
                  {e.place ?? 'Sin ubicación'}
                </TableCell>

                <TableCell>
                  {validNumber(e.mag)
                    ? e.mag.toFixed(1)
                    : '—'}
                </TableCell>

                <TableCell>
                  {validNumber(e.depth)
                    ? e.depth.toFixed(1)
                    : '—'}
                </TableCell>

                <TableCell>
                  {validNumber(e.latitude)
                    ? e.latitude.toFixed(3)
                    : '—'}
                </TableCell>

                <TableCell>
                  {validNumber(e.longitude)
                    ? e.longitude.toFixed(3)
                    : '—'}
                </TableCell>

                <TableCell>
                  {e.status ?? '—'}
                </TableCell>
              </TableRow>
            ))}

            {/* Mensaje cuando no existen registros */}
            {records.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography
                    color="text.secondary"
                    sx={{ py: 3 }}
                  >
                    No hay registros para los filtros seleccionados.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
      <Box
        sx={{
          borderTop: '1px solid #e5ebf3',
          bgcolor: '#ffffff',
        }}
      >
        <TablePagination
          component="div"
          count={records.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 50, 100]}
          labelRowsPerPage="Registros por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} de ${count.toLocaleString('es-EC')}`
          }
          sx={{
            color: '#0c2746',

            '& .MuiTablePagination-selectLabel': {
              fontSize: '0.85rem',
            },

            '& .MuiTablePagination-displayedRows': {
              fontSize: '0.85rem',
            },

            '& .MuiTablePagination-actions': {
              color: '#386bdf',
            },
          }}
        />
      </Box>
    </Paper>
  );
}