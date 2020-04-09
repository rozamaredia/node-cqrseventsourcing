
const produceCommand = require('./productProducer');

const route = (app) => {


  app.post('/insertProduct', async (req, res) => {
    // const orderId = uuidv4();
    // console.log("order Id -----> ", orderId);

    try {
      const orderdata = {
        brand: req.body.brand,
        name: req.body.name,
        color: req.body.color,
        quantity: req.body.quantity
      }

      produceCommand("ADD_PRODUCT", orderdata);
      res.status(200).send({
        success: true,
        data: orderdata,
        error: null
      })

    }
    catch (e) {

      console.log(e);

      res.status.send({
        success: false,
        data: null,
        error: e
      })

    }

  })

  return app;
}

module.exports = {
  route: route,
}
