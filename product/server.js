const kafka = require('kafka-node');
const util = require('util');
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const postModel = require('./postModel');
const app = express();
const command = express();
const query = express();

command.use(bodyParser.json());
command.use(bodyParser.urlencoded({ extended: false }));


query.use(bodyParser.json());
query.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



mongoose.connect('mongodb://localhost:27017/product', { useNewUrlParser: true }).then((err, res) => {

  console.log("mongodb is connected successfuly");

  require('./routes')(app);
  app.use('/productCommandService', require('./productCommand').route(command));
  app.use('/productQueryService', require('./productQuery')(query));
  require('./productConsumer');

})
  .catch(err => {
    console.log("Error => ", err);
  })

app.listen(4568, () => {
  console.log("Server is listening to port 4568");
})
