module.exports = {
    routes: [
      {
        method: 'POST',
        path: '/mercadopago/create-preference',
        handler: 'mercadopago.createPreference',
        config: {
          policies: [],
          middlewares: [],
        },
      },
    ],
  };