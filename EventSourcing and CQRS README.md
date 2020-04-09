#Project Title
Implementation of Event-Sourcing and CQRS pattern using Apache Kafka and MongoDB

##Technologies Used
- Node.js
- Kafka
- MongoDB

##Steps to Run the Project

##1. Start zookeeper
$ ./bin/zookeeper-server-start.sh config/zookeeper.properties

##2. Start Kafka
$ ./bin/kafka-server-start.sh config/server.properties

##3. Create Topic "order-service"
$ ./bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic order-service

##4. Start Kafka Producer
$ bin/kafka-console-producer.sh --broker-list localhost:9092 --topic order-service

##5. Start Kafka Consumer
$ bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic order-service --from-beginning

##6. Start MongoDB
$ mongo

##7. Start Order Service
$ cd desktop/node-eventsourcing/order
$ npm i
$ node server.js

##8. Start Product Service
$ cd desktop/node-eventsourcing/product
$ npm i
$ node server.js
