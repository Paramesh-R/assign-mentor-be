const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: 'string',
        unique: true,
        required: ['true', 'Please Enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters'],
    },

    mentor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mentor'
        },
        name: {
            type: 'string'
        }
    },
    previousMentor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mentor'
        },
        name: {
            type: 'string'
        }
    },
    // other student properties
    /* mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor'
    }, */
});


module.exports = mongoose.model('Student', studentSchema)