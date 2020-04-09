const kafka = require('kafka-node'); 
const bodyParser = require('body-parser'); 

const express = require('express');

const mongoose = require('mongoose'); 

const app = express();
const command = express();
const query = express();

command.use(bodyParser.json());
command.use(bodyParser.urlencoded({ extended: false }));


query.use(bodyParser.json());
query.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
try {

    /**
     * Kafka Producer Configuration
     */
    const Producer = kafka.Producer;
    const client = new kafka.KafkaClient('localhost:2181')
    const producer = new Producer(client);

    const kafka_topic = 'order-service';

    producer.on('ready', async function () {

        console.log('Kafka Producer is Ready');
    })

    producer.on('error', function (err) {
        console.log(err);
        console.log('[kafka-producer -> ' + kafka_topic + ']: connection errored');
        throw err;
    });

    
    mongoose.connect(`mongodb://localhost:27017/nodekafka`, { useNewUrlParser: true }).then((err, res) => {

        console.log('MongoDB connected successfully');

        //   var commandService = require('./routes')(app, producer, kafka_topic);
        //const commandService = require('./routes');
        app.use('/orderCommandService', require('./orderCommand').route(command, producer, kafka_topic));

        app.use('/orderQueryService', require('./orderQuery')(query));

        require('./orderConsumer');

    })
}
catch (e) {

    console.log(e);
}


app.listen(4567, () => {
    console.log('app is listening to port 4567')
})



