import { Generic } from '../generics';

export interface EuriborType extends Generic {
  euribor1w: EuriborData[];
  euribor2w: EuriborData[];
  euribor3w: EuriborData[];
  averageSectorSpread: EuriborData[];
}

export interface EuriborResponse {
  data: EuriborType;
}

export interface EuriborData {
  tenor: string;
  marketPlace: number;
  marketRiskFreeDate: number;
  marketRiskFreePremium: number;
  change: number;
  variation: number;
}
