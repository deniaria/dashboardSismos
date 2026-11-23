import { getEarthquakes } from "../firebase/earthquakeService";
import { useEffect, useMemo, useState } from 'react';
import { Alert, Box, CircularProgress, Container, Typography } from '@mui/material';
import Header from './Header';
import Navbar from './Navbar';
import KPICard from './KPICard';
import FilterPanel from './FilterPanel';
import ChartContainer from './ChartContainer';
import EarthquakeMap from './EarthquakeMap';
import DataTable from './DataTable';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import ColumnChart from '../charts/ColumnChart';
import { getDailyCounts, getDepthCounts, getKpis, getMagnitudeCounts, validNumber } from '../data/process';
import type { DateRange, Earthquake, MagnitudeRange } from '../types/earthquake';
const defaults: MagnitudeRange = { min: -2, max: 10 };
export default function Dashboard() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({ start: '', end: '' });
  const [magnitudeRange, setMagnitudeRange] = useState<MagnitudeRange>(defaults);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadEarthquakes() {
      try {
        setLoading(true);
        setError(null);

        const records = await getEarthquakes();

        if (cancelled) return;

        setEarthquakes(records);

        const dates = records
          .map((e) => e.time?.slice(0, 10))
          .filter((v): v is string => Boolean(v))
          .sort();

        if (dates.length > 0) {
          setDateRange({
            start: dates[0],
            end: dates[dates.length - 1],
          });
        }

      } catch (err: unknown) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Error al consultar Firebase"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadEarthquakes();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => earthquakes.filter((e) => {
    if (!e.time || !validNumber(e.mag)) return false;
    const date = e.time.slice(0, 10);
    return (!dateRange.start || date >= dateRange.start) && (!dateRange.end || date <= dateRange.end)
      && e.mag >= magnitudeRange.min && e.mag <= magnitudeRange.max;
  }), [earthquakes, dateRange, magnitudeRange]);
  const kpis = useMemo(() => getKpis(filtered), [filtered]);
  const daily = useMemo(() => getDailyCounts(filtered), [filtered]);
  const magnitudes = useMemo(() => getMagnitudeCounts(filtered), [filtered]);
  const depths = useMemo(() => getDepthCounts(filtered), [filtered]);
  const formatted = (v: number) => v.toLocaleString('es-EC');

  return <Box minHeight="100vh" bgcolor="#f5f7fc">
    <Header title="SISMO DATA" />
    <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
      <Navbar items={[{ label: 'Indicadores', href: '#indicadores' }, { label: 'Mapa', href: '#mapa' }, { label: 'Gráficos', href: '#graficos' }, { label: 'Registros', href: '#registros' }]} />
      <Typography variant="h5" fontWeight={800} color="#0c2746" sx={{ my: 2 }}>Actividad sísmica mundial</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>No se pudo cargar data/all_month.json: {error}. Verifica que estés ejecutando desde la raíz del repositorio.</Alert>}
      {loading ? <Box display="flex" justifyContent="center" py={8}><CircularProgress /></Box> : !error && <>
        <Box id="indicadores" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' }, gap: 2, mb: 2 }}>
          <KPICard title="Total de sismos" value={formatted(kpis.total)} unit="eventos" />
          <KPICard title="Magnitud máxima" value={kpis.maxMag === null ? '—' : kpis.maxMag.toFixed(1)} unit="" />
          <KPICard title="Profundidad promedio" value={kpis.avgDepth === null ? '—' : kpis.avgDepth.toFixed(2)} unit="km" />
        </Box>
        <Box sx={{ mb: 2 }}><FilterPanel dateRange={dateRange} magnitudeRange={magnitudeRange}
          onDateChange={setDateRange} onMagnitudeChange={setMagnitudeRange}
          isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)}
          onReset={() => { const dates = earthquakes.map((e) => e.time?.slice(0, 10)).filter((v): v is string => Boolean(v)).sort(); setDateRange({ start: dates[0] ?? '', end: dates[dates.length - 1] ?? '' }); setMagnitudeRange(defaults); }} />
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 2, mb: 2 }}>
          <Box id="mapa"><ChartContainer title="Epicentros · coordenadas USGS"><EarthquakeMap earthquakes={filtered} /></ChartContainer></Box>
          <Box id="graficos"><ChartContainer title="Sismos registrados por día"><LineChart data={daily} /></ChartContainer></Box>
          <ChartContainer title="Distribución por magnitud"><BarChart data={magnitudes} /></ChartContainer>
          <ChartContainer title="Sismos por profundidad"><ColumnChart data={depths} /></ChartContainer>
        </Box>
        <Box id="registros"><Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Registros originales del USGS</Typography><DataTable records={filtered} /></Box>
      </>}
    </Container>
  </Box>;
}
