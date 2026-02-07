import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Name is Required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true,'Email is Required'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,   
        required: function() {
            return this.provider === 'local';
        }
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    googleId: {
        type: String,
        enum:['local','google','facebook'],
        default:'local',
    },
}, {
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    });

const User = mongoose.model('User', userSchema);    
export default User;