const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    createdAt: { type: Date, default: Date.now }
});

module.exports = model('user', mySchema);

// title : String
// price : Number
// description : String
// category : String
// image : String