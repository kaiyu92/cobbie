var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NodeSchema = new Schema({
	title: String,
	desc: String,
	created_at: { type: Date, default: Date.now },
	created_by: String,
	primaryNode: Number,
	previousNode: { type: Schema.Types.ObjectId, ref: 'Node' },
	likes: [{ type: String, ref: 'User' }],
	project_id: { type: Schema.Types.ObjectId, ref: 'Project'}
});

module.exports = mongoose.model('Node', NodeSchema);