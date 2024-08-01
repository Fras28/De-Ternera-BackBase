'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pedido.pedido', ({ strapi }) => ({
  async findWithUser(ctx) {
    let userId = ctx.query.userId;

    // Manejo de userId si es un array
    if (Array.isArray(userId)) {
      userId = userId[0]; // Tomamos el primer elemento si es un array
    }

    try {
      const filters = userId ? { 
        $and: [
          {
            user: {
              id: {
                $eq: parseInt(userId)
              }
            }
          }
        ]
      } : {};

      const { results, pagination } = await strapi.service('api::pedido.pedido').find({
        filters,
        populate: {
          user: {
            fields: ['id', 'username', 'confirmed', 'createdAt', 'updatedAt']
          },
          articulos: {
            fields: ['id', 'nombre', 'precioKG', 'DescPorciento']
          },
          comercio: {
            fields: ['id', 'nombre', 'telefono']
          }
        }
      });

      const simplifiedPedidos = results.map(pedido => ({
        id: pedido.id,
        total: pedido.total,
        createdAt: pedido.createdAt,
        updatedAt: pedido.updatedAt,
        publishedAt: pedido.publishedAt,
        user: pedido.user,
        articulos: pedido.articulos,
        comercio: pedido.comercio
      }));

      return { 
        data: simplifiedPedidos,
        meta: { pagination }
      };
    } catch (error) {
      ctx.throw(500, `Error al buscar pedidos: ${error.message}`);
    }
  },
}));