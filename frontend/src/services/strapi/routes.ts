export const STRAPI_ROUTES = {
  auth: {
    login: '/api/auth/local',
    me: '/api/users/me',
  },
  singleTypes: {
    homePage: '/api/home-page',
    dashboard: '/api/dashboard',
    // euribor moved into the dashboard single type on the backend
    euribor: '/api/dashboard',
  },
  collectionTypes: {
    // loans are now returned through the dashboard single type
    loans: '/api/dashboard',
  },
  configuration: {
    get: '/api/configuration',
  },
};
