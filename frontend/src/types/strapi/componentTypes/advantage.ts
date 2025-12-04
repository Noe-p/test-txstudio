import { Generic } from '../generics';
import { MediaType } from '../media';

export interface AdvantageType extends Generic {
  title: string;
  description: string;
  icon: MediaType;
}
