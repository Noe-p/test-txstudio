import {
  BorrowerInfoType,
  FinancialInfoType,
  LoanStatus,
  StateInfoType,
  TimelineType,
  ValidationStepType,
} from '../componentTypes/loan';
import { Generic } from '../generics';
import { MediaType } from '../media';

export interface LoanType extends Generic {
  title: string;
  loanStatus: LoanStatus;
  stateInfo?: StateInfoType;
  borrowerInfo?: BorrowerInfoType;
  financialInfo?: FinancialInfoType;
  validationSteps?: ValidationStepType[];
  timeline?: TimelineType;
  documents?: MediaType[];
}

export interface LoansResponse {
  data: LoanType[];
}
