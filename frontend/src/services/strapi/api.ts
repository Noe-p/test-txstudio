import { STRAPI_ROUTES } from '@/services/strapi/routes';
import { LoginCredentials, LoginResponse, User } from '@/types/strapi/auth';
import { LoansResponse, LoanType } from '@/types/strapi/collectionTypes/loan';
import { ConfigurationResponse, ConfigurationType } from '@/types/strapi/singleTypes/configuration';
import { DashboardResponse, DashboardType } from '@/types/strapi/singleTypes/dashboard';
import { EuriborResponse, EuriborType } from '@/types/strapi/singleTypes/euribor';
import { HomePageResponse, HomePageType } from '@/types/strapi/singleTypes/homePage';
import { HttpService } from './httpService';

export const strapiApi = {
  auth: {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      const response = await HttpService.post<LoginResponse>(STRAPI_ROUTES.auth.login, credentials);
      return response.data;
    },
    me: async (): Promise<User> => {
      // D'abord récupérer l'ID de l'utilisateur
      const meResponse = await HttpService.get<User>(STRAPI_ROUTES.auth.me);
      const userId = meResponse.data.id;

      // Ensuite récupérer l'utilisateur complet avec populate
      const userResponse = await HttpService.get<User>(`/api/users/${userId}`, {
        params: {
          populate: 'profilePicture',
        },
      });
      return userResponse.data;
    },
  },
  homePage: {
    get: async (): Promise<HomePageType> => {
      const response = await HttpService.get<HomePageResponse>(STRAPI_ROUTES.singleTypes.homePage, {
        params: {
          populate: {
            Header: { populate: 'headerImage' },
            Advantage: { populate: 'icon' },
            Service: { populate: 'button' },
          },
        },
      });
      return response.data.data;
    },
  },
  configuration: {
    get: async (): Promise<ConfigurationType> => {
      const response = await HttpService.get<ConfigurationResponse>(
        STRAPI_ROUTES.configuration.get,
        {
          params: {
            populate: '*',
          },
        },
      );
      return response.data.data;
    },
  },
  dashboard: {
    get: async (): Promise<DashboardType> => {
      const response = await HttpService.get<DashboardResponse>(
        STRAPI_ROUTES.singleTypes.dashboard,
      );
      return response.data.data;
    },
  },
  euribor: {
    get: async (): Promise<EuriborType> => {
      const response = await HttpService.get<EuriborResponse>(STRAPI_ROUTES.singleTypes.euribor, {
        params: {
          populate: '*',
        },
      });
      return response.data.data;
    },
  },
  loans: {
    getAll: async (): Promise<LoanType[]> => {
      const response = await HttpService.get<LoansResponse>(STRAPI_ROUTES.collectionTypes.loans, {
        params: {
          populate: '*',
        },
      });
      return response.data.data;
    },
  },
};
