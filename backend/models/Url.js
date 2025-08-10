const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        validate: {
            validator: v => /^https?:\/\/.+/.test(v),
            message: 'Please provide a valid URL'
        }
    },
    shortCode: { type: String, required: true, unique: true, index: true },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Url', urlSchema);
