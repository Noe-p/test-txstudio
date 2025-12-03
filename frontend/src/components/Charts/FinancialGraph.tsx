'use client';

import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Col } from '../utils/Flex';

export interface FinancialGraphDataPoint {
  month: number;
  serie1: number;
  serie2: number;
  serie3: number;
}

export interface FinancialGraphSeriesNames {
  serie1: string;
  serie2: string;
  serie3: string;
}

interface FinancialGraphProps {
  data: FinancialGraphDataPoint[];
  seriesNames: FinancialGraphSeriesNames;
}

export function FinancialGraph({ data, seriesNames }: FinancialGraphProps): React.JSX.Element {
  const [hoveredSerie, setHoveredSerie] = useState<string | null>(null);
  const [hoveredY, setHoveredY] = useState<number | null>(null);

  // Formater les valeurs en K€
  const formatYAxis = (value: number) => {
    return `${(value / 1000).toFixed(0).padStart(2, '0')}K`;
  };

  // Formater le tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    useEffect(() => {
      if (active && payload && payload.length > 0) {
        const activeSerie = payload.find((p: any) => p.dataKey === hoveredSerie);
        const displayValue = activeSerie || payload[0];
        if (displayValue && typeof displayValue.value === 'number') {
          setHoveredY(displayValue.value);
        }
      } else {
        setHoveredY(null);
      }
    }, [active, payload]);

    if (active && payload && payload.length > 0) {
      const activeSerie = payload.find((p: any) => p.dataKey === hoveredSerie);
      const displayValue = activeSerie || payload[0];
      const serieName = seriesNames[displayValue.dataKey as keyof typeof seriesNames];

      return (
        <div className="bg-foreground text-background px-3 py-2 rounded-md shadow-lg">
          <p className="text-xs text-muted mb-1">{serieName}</p>
          <p className="font-bold">{`${displayValue.value}€`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Col className="w-full h-[400px] bg-background p-4 rounded-lg relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          {/* Ligne horizontale au hover */}
          {hoveredY !== null && (
            <ReferenceLine
              y={hoveredY}
              stroke="#9ca3af"
              strokeDasharray="3 3"
              strokeWidth={1}
              strokeOpacity={0.8}
            />
          )}
          <defs>
            <linearGradient id="colorSerie1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSerie2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSerie3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 14 }}
            tickLine={false}
          />
          <YAxis
            stroke="#9ca3af"
            tick={{ fill: '#9ca3af', fontSize: 14 }}
            tickFormatter={formatYAxis}
            tickLine={false}
            domain={[0, 'dataMax']}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: '#9ca3af',
              strokeWidth: 1,
              strokeDasharray: '3 3',
              strokeOpacity: 0.8,
            }}
            wrapperStyle={{ outline: 'none' }}
          />

          {/* Area de surbrillance au hover */}
          {hoveredSerie === 'serie1' && (
            <Area
              type="monotone"
              dataKey="serie1"
              stroke="none"
              fill="#10b981"
              fillOpacity={0.1}
              dot={false}
              isAnimationActive={false}
              pointerEvents="none"
            />
          )}
          {hoveredSerie === 'serie2' && (
            <Area
              type="monotone"
              dataKey="serie2"
              stroke="none"
              fill="#06b6d4"
              fillOpacity={0.1}
              dot={false}
              isAnimationActive={false}
              pointerEvents="none"
            />
          )}
          {hoveredSerie === 'serie3' && (
            <Area
              type="monotone"
              dataKey="serie3"
              stroke="none"
              fill="#f97316"
              fillOpacity={0.1}
              dot={false}
              isAnimationActive={false}
              pointerEvents="none"
            />
          )}
          {/* Courbes principales */}
          <Area
            type="monotone"
            dataKey="serie1"
            stroke="#10b981"
            strokeWidth={3}
            fill="url(#colorSerie1)"
            dot={false}
            activeDot={(props: any) => {
              const isClosest = hoveredSerie === 'serie1';
              return isClosest ? <circle cx={props.cx} cy={props.cy} r={6} fill="#10b981" /> : null;
            }}
            isAnimationActive={false}
            onMouseEnter={() => setHoveredSerie('serie1')}
            onMouseLeave={() => setHoveredSerie(null)}
          />
          <Area
            type="monotone"
            dataKey="serie2"
            stroke="#06b6d4"
            strokeWidth={3}
            fill="url(#colorSerie2)"
            dot={false}
            activeDot={(props: any) => {
              const isClosest = hoveredSerie === 'serie2';
              return isClosest ? <circle cx={props.cx} cy={props.cy} r={6} fill="#06b6d4" /> : null;
            }}
            isAnimationActive={false}
            onMouseEnter={() => setHoveredSerie('serie2')}
            onMouseLeave={() => setHoveredSerie(null)}
          />
          <Area
            type="monotone"
            dataKey="serie3"
            stroke="#f97316"
            strokeWidth={3}
            fill="url(#colorSerie3)"
            dot={false}
            activeDot={(props: any) => {
              const isClosest = hoveredSerie === 'serie3';
              return isClosest ? <circle cx={props.cx} cy={props.cy} r={6} fill="#f97316" /> : null;
            }}
            isAnimationActive={false}
            onMouseEnter={() => setHoveredSerie('serie3')}
            onMouseLeave={() => setHoveredSerie(null)}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Légende */}
      <div className=" flex justify-center gap-8 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-emerald-500" />
          <span className="text-sm">{seriesNames.serie1}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-cyan-500" />
          <span className="text-sm">{seriesNames.serie2}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-orange-500" />
          <span className="text-sm">{seriesNames.serie3}</span>
        </div>
      </div>
    </Col>
  );
}
