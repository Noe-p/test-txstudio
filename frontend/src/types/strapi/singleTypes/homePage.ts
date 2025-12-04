import { AdvantageType } from '../componentTypes/advantage';
import { HeaderType } from '../componentTypes/header';
import { ServiceType } from '../componentTypes/service';
import { Generic } from '../generics';

export interface HomePageType extends Generic {
  Header: HeaderType;
  Advantage: AdvantageType[];
  Service: ServiceType[];
}

export interface HomePageResponse {
  data: HomePageType;
}
