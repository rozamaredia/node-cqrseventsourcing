# Project - Event-sourcing and CQRS using Apache Kafka
The Project shows the implementation of Event-sourcing and CQRS (Command Query Responsibility Segregation) patterns with a simple order-service example in Apache Kafka. Apache Kafka is used a an Event store and MongoDB is used as a read store.

## Technologies Used
* Node.js
* Apache Kafka
* MongoDB

## Installation Steps for Apache Kafka
* Check if java is installed - $ java –version
* Download the kafka (kafka_2.12-2.3.0.tgz) from apache.org/dyn/closer.cgi?path=/kafka/2.3.0/kafka_2.12-2.3.0.tgz
* Extract the file - tar –xzf kafka_2.12-2.3.0.tgz

## Installation Steps for MongoDB through Homebrew
* Install Homebrew, $ /usr/bin/ruby -e "$(curl –fsSL  https://raw.githubusercontent.com/Homebrew/install/master/install)”
* Tap MongoDB Homebrew tap,  $ brew tap mongodb/brew
* Install MongoDB, $ brew install mongodb-community@4.2
* Run MongoDB on a new Window, $ mongodb
* Run Mongo shell on a new window, $ mongo
* Stop Mongo Daemon, Type quit()
* Stop Mongo shell, Hit Ctrl+C

## Step 1: Start zookeeper and Kafka
* Make sure you are in the right directory (kafka directory)
* Start Zookeeper - $ ./bin/zookeeper-server-start.sh config/zookeeper.properties
* On new terminal window, start kafka - $ ./bin/kafka-server-start.sh config/server.properties

## Step 2: Create Topic "order-service" 
$ ./bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic order-service

## Step 3: Start Kafka Producer  
$ bin/kafka-console-producer.sh --broker-list localhost:9092 --topic order-service

## Step 4: Start Kafka Consumer 
$ bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic order-service --from-beginning

## Step 5: Start MongoDB 
$ mongo

## Step 6: Start Order Service 
* $ cd desktop/eventsourcing_cqrs/order 
* $ npm i 
* $ node server.js

## Step 7: Start Product Service 
* $ cd desktop/eventsourcing_cqrs/product 
* $ npm i 
* $ node server.js

© 2020 GitHub, Inc.
