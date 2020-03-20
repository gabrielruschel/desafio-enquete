const mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.connection;
autoIncrement.initialize(connection);


const PollSchema = mongoose.Schema({
    poll_description: {type: String, required:true},
    options: [{
        option_id: Number,
        option_description: String,
        qty: { type: Number, default: 0}
    }],
    views: {type: Number, default: 0}
});

// Auto-increment poll_id field
PollSchema.plugin(autoIncrement.plugin,{model: 'Poll', field: 'poll_id', startAt: 1});

module.exports = mongoose.model('Poll', PollSchema);
