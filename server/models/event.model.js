const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    startTime: {
        type: Date,
        required: true,
        trim: true,
    },
    endTime: {
        type: Date,
        required: true,
        trim: true,
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;