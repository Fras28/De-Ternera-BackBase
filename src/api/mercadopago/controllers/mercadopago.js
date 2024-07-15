const { MercadoPagoConfig, Preference } = require('mercadopago');

module.exports = {
  createPreference: async (ctx) => {
    try {
      // Configurar el cliente de Mercado Pago
      const client = new MercadoPagoConfig({
        accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
      });

      // Crear instancia de Preference
      const preference = new Preference(client);

      const preferenceData = {
        items: [
          {
            id: ctx.request.body.id || 'item-ID',
            title: ctx.request.body.title,
            currency_id: ctx.request.body.currency_id || 'ARS',
            picture_url: ctx.request.body.picture_url || 'http://example.com/product.jpg',
            description: ctx.request.body.description || 'Descripción del producto',
            category_id: ctx.request.body.category_id || 'category123',
            quantity: Number(ctx.request.body.quantity),
            unit_price: Number(ctx.request.body.price)
          }
        ],
        payer: {
          name: ctx.request.body.payer_name || 'Nombre',
          surname: ctx.request.body.payer_surname || 'Apellido',
          email: ctx.request.body.payer_email || 'payer@email.com',
          phone: {
            area_code: ctx.request.body.payer_area_code || '11',
            number: ctx.request.body.payer_phone || '22223333'
          },
          identification: {
            type: ctx.request.body.payer_doc_type || 'DNI',
            number: ctx.request.body.payer_doc_number || '12345678'
          },
          address: {
            street_name: ctx.request.body.payer_street || 'Calle',
            street_number: ctx.request.body.payer_street_number || 123,
            zip_code: ctx.request.body.payer_zip_code || '1111'
          }
        },
        back_urls: {
          success: `${process.env.FRONTEND_URL}/success`,
          failure: `${process.env.FRONTEND_URL}/failure`,
          pending: `${process.env.FRONTEND_URL}/pending`
        },
        auto_return: "approved",
        payment_methods: {
          excluded_payment_methods: [
            { id: "amex" }
          ],
          excluded_payment_types: [
            { id: "atm" }
          ],
          installments: 6
        },
        notification_url: process.env.NOTIFICATION_URL,
        statement_descriptor: "MITIENDA",
        external_reference: "Reference_1234",
        expires: true,
        expiration_date_from: new Date().toISOString(),
        expiration_date_to: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
      };

      const response = await preference.create({ body: preferenceData });
      ctx.send({ preferenceId: response.id });
    } catch (error) {
      console.error('Error creating preference:', error);
      ctx.throw(500, 'Error creating Mercado Pago preference');
    }
  },
};