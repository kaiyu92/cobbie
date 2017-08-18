var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
	comment: String,
	created_at: { type: Date, default: Date.now },
	author: String,
	node_id: { type: Schema.Types.ObjectId, ref: 'Node' },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
