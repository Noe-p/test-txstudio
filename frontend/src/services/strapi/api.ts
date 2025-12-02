import { STRAPI_ROUTES } from '@/services/strapi/routes';
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
};
