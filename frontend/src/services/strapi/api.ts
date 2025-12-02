import { STRAPI_ROUTES } from '@/services/strapi/routes';
import { LoginCredentials, LoginResponse, User } from '@/types/strapi/auth';
import { AdvantagesResponse, AdvantageType } from '@/types/strapi/collectionTypes/advantage';
import { ServicesResponse, ServiceType } from '@/types/strapi/collectionTypes/service';
import { ConfigurationResponse, ConfigurationType } from '@/types/strapi/singleTypes/configuration';
import { HeaderResponse, HeaderType } from '@/types/strapi/singleTypes/header';
import { HttpService } from './httpService';

export const strapiApi = {
  auth: {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      const response = await HttpService.post<LoginResponse>(STRAPI_ROUTES.auth.login, credentials);
      return response.data;
    },
    me: async (): Promise<User> => {
      const response = await HttpService.get<User>(STRAPI_ROUTES.auth.me);
      return response.data;
    },
  },
  configuration: {
    get: async (): Promise<ConfigurationType> => {
      const response = await HttpService.get<ConfigurationResponse>(
        STRAPI_ROUTES.singleTypes.configuration,
        {
          params: {
            populate: 'logo',
          },
        },
      );
      return response.data.data;
    },
  },
  header: {
    get: async (): Promise<HeaderType> => {
      const response = await HttpService.get<HeaderResponse>(STRAPI_ROUTES.singleTypes.header, {
        params: {
          populate: 'header',
        },
      });
      return response.data.data;
    },
  },
  advantages: {
    getAll: async (): Promise<AdvantageType[]> => {
      const response = await HttpService.get<AdvantagesResponse>(
        STRAPI_ROUTES.collectionTypes.advantages,
        {
          params: {
            populate: 'icon',
          },
        },
      );
      return response.data.data;
    },
  },
  services: {
    getAll: async (): Promise<ServiceType[]> => {
      const response = await HttpService.get<ServicesResponse>(
        STRAPI_ROUTES.collectionTypes.services,
        {
          params: {
            populate: 'button',
          },
        },
      );
      return response.data.data;
    },
  },
};
