import { Generic } from '../generics';

export interface EuriborTableRow {
  tenor: string;
  marketPlace: number;
  marketRiskFreeDate: number;
  marketRiskFreePremium: number;
  change: number;
  variation: number;
}

export interface EuriborType extends Generic {
  title: string;
  table: EuriborTableRow[];
}

export interface EuriborResponse {
  data: EuriborType;
}

// Legacy types for backwards compatibility with EuriborTable component
export interface EuriborData {
  tenor: string;
  marketPlace: number;
  marketRiskFreeDate: number;
  marketRiskFreePremium: number;
  change: number;
  variation: number;
}
