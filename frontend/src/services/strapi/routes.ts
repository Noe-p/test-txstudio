export const STRAPI_ROUTES = {
  auth: {
    login: '/api/auth/local',
    me: '/api/users/me',
  },
  singleTypes: {
    header: '/api/header',
    configuration: '/api/configuration',
    dashboard: '/api/dashboard',
    euribor: '/api/euribor-table',
  },
  collectionTypes: {
    advantages: '/api/advantages',
    services: '/api/services',
    loans: '/api/loans',
  },
};
