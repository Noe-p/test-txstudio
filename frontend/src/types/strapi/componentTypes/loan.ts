export type LoanStatus = 'Validé' | 'En attente' | 'Clos';
export type StatusGroup = 'Prêt validé' | 'En attente' | 'Clôturé';
export type RequestStatus = 'Validé' | 'En attente';

export interface StateInfoType {
  id: number;
  subtitle?: string;
  currentAmount?: number;
  statusGroup?: StatusGroup;
}

export interface BorrowerInfoType {
  id: number;
  contractNumber?: string;
  borrowerId?: string;
  requestedAmount?: number;
  currentLoanAmount?: number;
  monthlyPayment?: number;
  durationMonths?: number;
}

export interface FinancialInfoType {
  id: number;
  interestRate?: string;
  commission?: string;
  taeg?: number;
  requestDate?: string;
  lastDueDate?: string;
  requestStatus?: RequestStatus;
}

export interface ValidationStepType {
  id: number;
  label?: string;
  description?: string;
  isCompleted?: boolean;
  requirements?: string;
}

export interface TimelineType {
  id: number;
  expectedClosureDate?: string;
}
