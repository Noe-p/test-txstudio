import { Generic } from '../generics';
import { MediaType } from '../media';

export interface HeaderType extends Generic {
  upTitle: string;
  title: string;
  subTitle: string;
  headerImage: MediaType;
}
