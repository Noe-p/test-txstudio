import {
  FinancialGraphDataPoint,
  FinancialGraphSeriesNames,
} from '@/components/Charts/FinancialGraph';
import { EuriborType } from '../collectionTypes/euribor';
import { LoanType } from '../collectionTypes/loan';
import { Generic } from '../generics';

export interface DashboardType extends Generic {
  segment: string;
  risk: string;
  lastTransaction: string;
  financialGraphData: {
    chartData: FinancialGraphDataPoint[];
    seriesNames: FinancialGraphSeriesNames;
  };
  loans: LoanType[];
  euribors: EuriborType[];
}

export interface DashboardResponse {
  data: DashboardType;
}
