import { STRAPI_ROUTES } from '@/services/strapi/routes';
import { AdvantagesResponse, AdvantageType } from '@/types/strapi/collectionTypes/advantage';
import { ServicesResponse, ServiceType } from '@/types/strapi/collectionTypes/service';
import { HeaderResponse, HeaderType } from '@/types/strapi/singleTypes/header';
import { HttpService } from './httpService';

export const strapiApi = {
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
