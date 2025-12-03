import {
  FinancialGraphDataPoint,
  FinancialGraphSeriesNames,
} from '@/components/Charts/FinancialGraph';
import { Generic } from '../generics';

export interface DashboardType extends Generic {
  segment: string;
  risk: string;
  lastTransaction: string;
  financialGraphData: {
    chartData: FinancialGraphDataPoint[];
    seriesNames: FinancialGraphSeriesNames;
  };
}

export interface DashboardResponse {
  data: DashboardType;
}
