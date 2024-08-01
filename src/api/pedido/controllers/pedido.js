'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pedido.pedido', ({ strapi }) => ({
  async findWithUser(ctx) {
    const pedidos = await strapi.entityService.findMany('api::pedido.pedido', {
      populate: ['user', 'articulos', 'comercio'],
    });

    const simplifiedPedidos = pedidos.map(pedido => ({
      id: pedido.id,
      total: pedido.total,
      createdAt: pedido.createdAt,
      updatedAt: pedido.updatedAt,
      publishedAt: pedido.publishedAt,
      user: pedido.user ? {
        id: pedido.user.id,
        username: pedido.user.username,
        confirmed: pedido.user.confirmed,
        createdAt: pedido.user.createdAt,
        updatedAt: pedido.user.updatedAt
      } : null,
      articulos: pedido.articulos.map(articulo => ({
        id: articulo.id,
        nombre: articulo.nombre,
        precioKG: articulo.precioKG,
        DescPorciento: articulo.DescPorciento
      })),
      comercio: pedido.comercio ? {
        id: pedido.comercio.id,
        nombre: pedido.comercio.nombre,
        telefono: pedido.comercio.telefono
      } : null
    }));

    return { data: simplifiedPedidos };
  },
}));