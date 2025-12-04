export const STRAPI_ROUTES = {
  auth: {
    login: '/api/auth/local',
    me: '/api/users/me',
  },
  singleTypes: {
    homePage: '/api/home-page',
    dashboard: '/api/dashboard',
    euribor: '/api/euribor-table',
  },
  collectionTypes: {
    loans: '/api/loans',
  },
  configuration: {
    get: '/api/configuration',
  },
};
