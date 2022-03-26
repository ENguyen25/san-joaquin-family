const mongoose = require('mongoose');
require('mongoose-type-url');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    eventURL: {
        type: String,
        trim: true,
    },
    imageURL: {
        type: String,
        trim: true,
    },
    startTime: {
        type: Date,
        trim: true,
    },
    endTime: {
        type: Date,
        trim: true,
    },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
