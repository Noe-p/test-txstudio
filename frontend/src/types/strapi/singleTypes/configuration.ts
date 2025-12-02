import { Generic } from '../generics';
import { MediaType } from '../media';

export interface ConfigurationType extends Generic {
  logo: MediaType;
}

export interface ConfigurationResponse {
  data: ConfigurationType;
}
