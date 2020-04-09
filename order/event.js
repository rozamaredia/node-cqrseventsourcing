const orderModel = require('./orderModel');
const produceCommand = require('./orderProducer');

const startOrder = (data) => {
  produceCommand("START_ORDER", data);
  console.log("------order started -----");
  return;
};


const deliverOrder = (data) => {
  produceCommand("ORDER_DELIVERED", data);
  return;
};

const orderAccepted = async (data) => {
  const result = await orderModel.updateOrder(data._id, { status: 'ORDER_ACCEPTED' });
  console.log("------order accepted -----");
  startOrder(result);
  return;
};

const orderCanceled = (data) => {
  orderModel.updateOrder(data._id, { status: 'ORDER_CANCELED' });
  console.log("------order canceled -----");
  return;
};

const orderShipped = async (data) => {
  const result = await orderModel.updateOrder(data._id, { status: 'ORDER_SHIPPED' });
  console.log("------order shipped -----");
  deliverOrder(result);
  return;
};

const orderDelivered = (data) => {
  orderModel.updateOrder(data._id, { status: 'ORDER_DELIVERED' });
  console.log("<============  order Delivered ================>");
  return;
};

module.exports = {
  orderAccepted: orderAccepted,
  orderCanceled: orderCanceled,
  orderShipped: orderShipped,
  orderDelivered: orderDelivered,
}
