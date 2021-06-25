const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLM = require('passport-local-mongoose'); //passportLocalMongoose


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.plugin(passportLM); //ADD password, verifica se username é único 
// e dá alguns métodos adicionais - nesse schema tem email e password

module.exports = mongoose.model('User', UserSchema);