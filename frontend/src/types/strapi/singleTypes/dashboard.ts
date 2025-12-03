import { Generic } from '../generics';

export interface DashboardType extends Generic {
  segment: string;
  risk: string;
  lastTransaction: string;
}

export interface DashboardResponse {
  data: DashboardType;
}
