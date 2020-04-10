const Mongoose = require('mongoose');

const productSchema = new Mongoose.Schema({
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
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true });

class Product {

    static getProductById(id) {
        return this.findOne({
            _id: Mongoose.mongo.ObjectID(id)
        }).exec();
    }
   
    static getProduct(brand, name, color) {

        return this.find({
            brand: brand,
            name: name,
            color: color
        }).sort({ createdAt: -1 }).limit(1).exec();

    }

    static insertProduct({ brand, name, color, quantity }) {

        const product = this({
            brand,
            name,
            color,
            quantity
        })

        return product.save();
    }

    static updateProduct(id, updateData) {

        return this.updateOne({ _id: id }, updateData).exec();

    }

    static deleteProduct(productId) {

        console.log("deleteProduct", productId)
        return this.deleteMany({
            userId: userId
        }).exec();

    }

}

productSchema.loadClass(Product);

module.exports = Mongoose.model('Product', productSchema)
