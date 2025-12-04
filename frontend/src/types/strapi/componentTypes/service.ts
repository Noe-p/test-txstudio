import { Block } from '@/components/Strapi/BlocksRenderer';
import { Generic } from '../generics';
import { LinkButtonType } from './linkButton';

export interface ServiceType extends Generic {
  nav: string;
  description: Block[];
  button?: LinkButtonType;
}
