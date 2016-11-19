let mongoose = require('mongoose')
let Schema = mongoose.Schema

let BlogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    postedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { versionKey: false })

BlogSchema.pre('save',next=>{
	now = new Date()
	if(!this.createdAt) {
		this.createdAt = now
	}

	next()
})

module.exports = mongoose.model('blog', BlogSchema)