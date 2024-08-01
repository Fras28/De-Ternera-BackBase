'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::pedido.pedido');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const extraRoutes = [
  {
    method: 'GET',
    path: '/pedidos-with-user',
    handler: 'pedido.findWithUser',
    config: {
      policies: [],
      auth: false,
    },
  },
];

module.exports = customRouter(defaultRouter, extraRoutes);