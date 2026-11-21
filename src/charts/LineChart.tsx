import { Box, Typography } from '@mui/material';
import type { ChartPoint } from '../types/earthquake';

export default function LineChart({ data }: { data: ChartPoint[] }) {
  if (!data.length) {
    return (
      <Typography color="text.secondary">
        No hay datos para el intervalo seleccionado.
      </Typography>
    );
  }

  const width = 720;
  const height = 260;

  const margin = {
    top: 20,
    right: 20,
    bottom: 45,
    left: 50,
  };

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Escala vertical
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const step = Math.max(1, Math.ceil(maxValue / 4 / 25) * 25);
  const maxY = step * 4;

  const getX = (index: number) =>
    margin.left +
    (index / Math.max(data.length - 1, 1)) * chartWidth;

  const getY = (value: number) =>
    margin.top + chartHeight - (value / maxY) * chartHeight;

  // Coordenadas de la línea
  const points = data
    .map((d, i) => `${getX(i)},${getY(d.value)}`)
    .join(' ');

  // Fechas distribuidas en el eje horizontal
  const labelIndexes = [
    0,
    Math.round((data.length - 1) * 0.25),
    Math.round((data.length - 1) * 0.5),
    Math.round((data.length - 1) * 0.75),
    data.length - 1,
  ];

  // Identificar los 5 días con mayor cantidad de sismos
  const topFiveDays = new Set(
    [...data]
      .sort(
        (a, b) =>
          b.value - a.value ||
          a.label.localeCompare(b.label)
      )
      .slice(0, 5)
      .map((day) => day.label)
  );

  // Formato de las fechas
  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-').map(Number);

    return new Date(Date.UTC(year, month - 1, day))
      .toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        timeZone: 'UTC',
      });
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Gráfico de sismos registrados por día"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      >
        {/* Líneas horizontales y valores del eje Y */}
        {[0, 1, 2, 3, 4].map((i) => {
          const value = i * step;
          const y = getY(value);

          return (
            <g key={i}>
              <line
                x1={margin.left}
                x2={width - margin.right}
                y1={y}
                y2={y}
                stroke="#e5ebf3"
                strokeWidth="1"
              />

              <text
                x={margin.left - 12}
                y={y + 4}
                textAnchor="end"
                fontSize="11"
                fill="#8190a5"
              >
                {value}
              </text>
            </g>
          );
        })}

        {/* Línea violeta de actividad sísmica */}
        <polyline
          points={points}
          fill="none"
          stroke="#6957f5"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Destacar los 5 días con más sismos */}
        {data.map((d, i) => {
          if (!topFiveDays.has(d.label)) return null;

          return (
            <circle
              key={d.label}
              cx={getX(i)}
              cy={getY(d.value)}
              r="4.5"
              fill="#ffffff"
              stroke="#6957f5"
              strokeWidth="2.5"
            >
              <title>
                {`${formatDate(d.label)}: ${d.value.toLocaleString('es-EC')} sismos`}
              </title>
            </circle>
          );
        })}

        {/* Fechas del eje X */}
        {[...new Set(labelIndexes)].map((index) => (
          <text
            key={index}
            x={getX(index)}
            y={height - 12}
            textAnchor={
              index === 0
                ? 'start'
                : index === data.length - 1
                ? 'end'
                : 'middle'
            }
            fontSize="11"
            fill="#8190a5"
          >
            {formatDate(data[index].label)}
          </text>
        ))}
      </svg>

      {/* Leyenda explicativa */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          mt: 1,
          px: 1,
        }}
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            bgcolor: '#ffffff',
            border: '2px solid #6957f5',
            flexShrink: 0,
          }}
        />

        <Typography
          variant="caption"
          sx={{
            color: '#65758b',
            fontSize: { xs: '0.65rem', sm: '0.75rem' },
            textAlign: 'center',
          }}
        >
          Los puntos destacan los 5 días con mayor cantidad de sismos
          en el intervalo seleccionado.
        </Typography>
      </Box>
    </Box>
  );
}