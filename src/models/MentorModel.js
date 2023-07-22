const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
    name: {
        type: 'string',
        unique: true,
        required: ['true', 'Please Enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters'],
    },

    // other student properties
});


module.exports = mongoose.model('Mentor', mentorSchema)