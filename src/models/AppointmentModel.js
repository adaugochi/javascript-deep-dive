import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
    userAvailabilityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAvailability'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reason: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Appointment', AppointmentSchema)