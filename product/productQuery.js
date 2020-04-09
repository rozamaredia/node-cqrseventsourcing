const productModel = require('./postModel');


module.exports = (query) => {

  query.get('/getProduct', async (req, res) => {
    console.log("<=====get product=====>");
    try {

      const productId = req.query.productId;
      console.log("product id ---> ", productId);
      const productCollection = await productModel.getProductById(productId);
    console.log({productCollection});
      res.status(200).send({
        success: true,
        data: productCollection,
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


  query.get('/getSpecificProduct', async (req, res) => {
    console.log("<=====get order=====>");
    try {

      const brand = req.query.brand;
      const name = req.query.name;
      const color = req.query.color;

      console.log("get Specific product by values ---> ");
      const productCollection = await productModel.getProduct(brand, name, color);

      res.status(200).send({
        success: true,
        data: productCollection,
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
