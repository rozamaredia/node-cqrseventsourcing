const Mongoose = require('mongoose');

const orderSchema = new Mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true });

class Order {

    static getOrderById(id) {

        return this.findOne({
            _id: Mongoose.mongo.ObjectID(id)
        }).exec();
    }

    static insertOrder(order) {

        const orderData = this(order);

        return orderData.save();
    }

    static async updateOrder(id, updateData) {
        const data = await this.updateOne({ _id: id }, updateData).exec();
        if (data.ok === 1) {
            return this.getOrderById(id);
        }
    }

}

orderSchema.loadClass(Order);

module.exports = Mongoose.model('Order', orderSchema)
