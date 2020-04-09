const kafka = require('kafka-node');
const orderModel = require('./orderModel');
const event = require('./event');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient('localhost:2181');
let consumer = new Consumer(
  client,
  [{ topic: 'order-service', partition: 0 }],
  {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: 'utf8',
    fromOffset: false
  }
);

consumer.on('message', async function (message) {
  const consumerdata = JSON.parse(message.value);

  console.log("===>", consumerdata);

  // console.log(consumerdata.data);
  switch (consumerdata.type) {

    case 'ORDER_PLACED': {
      // const orderCollection = await orderModel.insertOrder(consumerdata.data);
      console.log("order Id -----> ", consumerdata.data._id);
      // console.log({ orderCollection });
      // const deleteStatus = await postModel.deletePosts(consumerdata.data);
      // console.log("deleteStatus", deleteStatus);
      console.log("Order successfully placed");
      return;
    };
    case 'ORDER_ACCEPTED': {
      event.orderAccepted(consumerdata.data);
      return;
    };
    case 'ORDER_CANCELED': {
      event.orderCanceled(consumerdata.data);
      return;
    };
    case 'PRODUCT_SHIPPED': {
      event.orderShipped(consumerdata.data);
      return;
    };
    case 'ORDER_DELIVERED': {
      event.orderDelivered(consumerdata.data);
      return;
    };
    default:
      return;
  }
});
consumer.on('error', function (err) {
  console.log('error', err);
});
