const mongoose = require('mongoose');
const { Schema } = mongoose

const UserSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
})

const virtal = UserSchema.virtual('id')
virtal.get(function () {
    return this._id
})
UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.User = mongoose.model('User', UserSchema)