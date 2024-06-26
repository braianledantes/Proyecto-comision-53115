const mongoose = require('mongoose');
const TicketDto = require('../../../dtos/TicketDto');

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
})

const TicketModel = mongoose.model('Ticket', ticketSchema, 'tickets');

module.exports = { TicketModel }