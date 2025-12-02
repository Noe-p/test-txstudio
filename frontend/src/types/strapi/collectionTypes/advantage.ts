import { Generic } from '../generics';
import { Media } from '../media';

export interface AdvantageType extends Generic {
  title: string;
  description: string;
  icon: Media;
}

export interface AdvantagesResponse {
  data: AdvantageType[];
}
