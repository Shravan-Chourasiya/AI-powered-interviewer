import mongoose, { Schema, Document } from "mongoose";

//user schema for typescript
export interface User extends Document {
    username: string,
    password: string,
    email: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isActive: boolean,
    isVerified: boolean,
    isAdmin: boolean
}

//userschema for mongoDb

const userSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required!"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minlength: 8,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Use a Valid Email Address"],
        unique: true
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is required!"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify Code Expiry is required!"],
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", userSchema)
export default UserModel;