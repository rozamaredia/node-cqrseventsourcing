const orderModel = require('./orderModel');
const bodyParser = require('body-parser');

const route = (app, producer, kafka_topic) => {


    app.post('/placeOrder', async (req, res) => {

        try {

            const orderdata = {
                brand: req.body.brand,
                name: req.body.name,
                color: req.body.color,
                status: "ORDER_PLACED"
            }

            const orderCollection = await orderModel.insertOrder(orderdata);
            console.log("order Id -----> ", orderCollection._id);
            console.log({ orderCollection });

            let payload = [{
                topic: kafka_topic,
                messages: JSON.stringify({
                    type: "ORDER_PLACED",
                    data: orderCollection
                })
            }];
           
            producer.send(payload, (err, data) => {
                if (err) {
                    console.log('[kafka-producer -> ' + kafka_topic + ']: broker update failed')
                }

                console.log('[kafka-producer -> ' + kafka_topic + ']: broker update success');
            });

            res.status(200).send({
                success: true,
                data: payload,
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

    return app;
}

module.exports = {
    route: route,
}
