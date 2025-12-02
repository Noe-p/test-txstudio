import { Generic } from '../generics';
import { MediaType } from '../media';

export interface HeaderType extends Generic {
  upTitle: string;
  title: string;
  subtitle: string;
  header: MediaType;
}

export interface HeaderResponse {
  data: HeaderType;
}
