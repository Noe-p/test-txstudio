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
  euriborData: Record<string, EuriborData[]>;
}

export interface DashboardResponse {
  data: DashboardType;
}

export interface EuriborData {
  tenor: string;
  marketPlace: string;
  marketRiskFreeDate: string;
  marketRiskFreePremium: string;
  change: string;
  variation: string;
}
