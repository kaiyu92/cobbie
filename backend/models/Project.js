var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
	title: String,
	desc: String,
	startDate: { type: Date, default: Date.now },
	deadline: Date,
	users: [{ type: String, ref: 'User' }],
	nodes:[{ type: Schema.Types.ObjectId, ref: 'Node' }]
});

module.exports = mongoose.model('Project', ProjectSchema);