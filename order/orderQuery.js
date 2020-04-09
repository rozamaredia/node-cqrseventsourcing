const orderModel = require('./orderModel');


module.exports = (query) => {

  query.get('/getOrder', async (req, res) => {
    console.log("<=====get order=====>");
    try {

      const orderId = req.query.orderId;
      console.log("order id ---> ", orderId);
      const userCollection = await orderModel.getOrderById(orderId);
      console.log({userCollection});
      
      res.status(200).send({
        success: true,
        data: userCollection,
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

  return query;
}

