const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient('localhost:2181')
const producer = new Producer(client);

const kafka_topic = 'order-service';

function produceCommand(type, data) {
  let payload = [{
    topic: kafka_topic,
    messages: JSON.stringify({
      type: type,
      data: data
    })
  }];
  producer.send(payload, (err, data) => {
    if (err) {
      console.log('[kafka-producer -> ' + kafka_topic + ']: broker update failed')
    }

    console.log('[kafka-producer -> ' + kafka_topic + ']: broker update success');
  });

}


module.exports = produceCommand;

