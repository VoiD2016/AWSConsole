let mongoose    = require('mongoose');
let log         = require('./logger')(module);

mongoose.connect('mongodb://localhost/test1');
let db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

let Schema = mongoose.Schema;

let ua_item = new Schema({
    user_agent: { type: String, required: true },
    counter: { type: Number, required: true },
});

let UserAgentModel = mongoose.model('UserAgent', ua_item);

module.exports.UserAgentModel = UserAgentModel;