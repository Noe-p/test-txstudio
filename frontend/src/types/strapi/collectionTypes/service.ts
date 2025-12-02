import { Block } from '@/components/Strapi/BlocksRenderer';
import { LinkButtonType } from '../componentTypes/linkButton';
import { Generic } from '../generics';

export interface ServiceType extends Generic {
  nav: string;
  description: Block[];
  button?: LinkButtonType;
}

export interface ServicesResponse {
  data: ServiceType[];
}
