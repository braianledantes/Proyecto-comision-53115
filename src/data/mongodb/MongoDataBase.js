const mongoose = require('mongoose')
const { mongoUrl, dbName } = require('../../config/mongodb.config')
const CartsDao = require('./dao/CartsDao')
const MessagesDao = require('./dao/MessagesDao')
const ProductsDao = require('./dao/ProductsDao')
const UsersDao = require('./dao/UsersDao')
const TicketDao = require('./dao/TicketDao')

mongoose.connect(mongoUrl, { dbName })
    .then(() => { console.log('Mongodb conected') })
    .catch((err) => { console.error('Error connecting to Mongodb', err) })

class MongoDataBase {
    getCartsDao() {
        return new CartsDao()
    }

    getMessagesDao() {
        return new MessagesDao()
    }

    getProductsDao() {
        return new ProductsDao()
    }

    getUsersDao() {
        return new UsersDao()
    }

    getTicketDao() {
        return new TicketDao()
    }
}

module.exports = MongoDataBase