
const postModel = require('./postModel');
const produceCommand = require('./productProducer');


const shipProduct = (data) => {
  produceCommand("PRODUCT_SHIPPED", data);
  console.log("------product shipped -----");
  return;
}

const validateProduct = async (data) => {
  const product = await postModel.getProduct(data.brand, data.name, data.color);
  console.log("product details ========>:");
  console.log({ product });
  if (product.length > 0) {
    if (product[0].quantity > 0) {
      console.log("------- product exist -------");
      produceCommand("ORDER_ACCEPTED", data);
      return;
    } else {
      produceCommand("ORDER_CANCELED", data);
      console.log("------- product not found -------");
      return;
    }
  } else {
    produceCommand("ORDER_CANCELED", data);
    console.log("------- product not found -------");
    return;
  }
}

const fetchProduct = async (data) => {
  const product = await postModel.getProduct(data.brand, data.name, data.color);
  console.log({ product });
  if (product[0].quantity > 0) {
    const productLeft = product[0].quantity - 1;
    console.log("*******  product quantity left *******", productLeft)
    postModel.updateProduct(product[0]._id, { quantity: productLeft });
    console.log("------product fetched -----");
    shipProduct(data);
    return;
  }
  console.log("------failed to fetch product -----");
  return;
}


module.exports = {
  validateProduct: validateProduct,
  fetchProduct: fetchProduct
}
