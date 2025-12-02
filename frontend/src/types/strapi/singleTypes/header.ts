import { Generic } from '../generics';
import { Media } from '../media';

export interface HeaderType extends Generic {
  upTitle: string;
  title: string;
  subtitle: string;
  header: Media;
}

export interface HeaderResponse {
  data: HeaderType;
}
