'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pedido.pedido', ({ strapi }) => ({
  async findWithUser(ctx) {
    const pedidos = await strapi.entityService.findMany('api::pedido.pedido', {
      populate: ['user', 'articulos', 'comercio'],
    });
    return { data: pedidos };
  },
}));