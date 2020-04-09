const kafka = require('kafka-node');
const postModel = require('./postModel');
const event = require('./event');
console.log("kafka consumer is booting up")
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
  switch (consumerdata.type) {

    case 'ORDER_PLACED': {
      console.log("----- ORDER_PLACED ---");
      event.validateProduct(consumerdata.data);
      return;
    };
    case 'START_ORDER': {
      event.fetchProduct(consumerdata.data);
      return;
    };
    case 'ADD_PRODUCT': {
      const productCollection = await postModel.insertProduct(consumerdata.data);
      console.log(" ---added product details -----", productCollection);
      return;
    };
    case 'ORDER_SHIPPED': {
      event.orderShipped(consumerdata.data);
      return;
    };
    default:
      return;
  }
});
consumer.on('error', function (err) {
  console.log('error', err);
});

