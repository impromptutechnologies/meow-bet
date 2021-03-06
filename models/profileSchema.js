
const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
    userID: {type:String, required:true, unique:true},
    username: {type:String, required:true},
    serverID: {type:String, required:true},
    tokens: {type: Number, default:0, required:false},
    customerID: {type: String, default:0, required:false},
    returntokens: {type: Number, default:0},
    bettokens: {type: Number, default:0},
    payments:[],
    lastTransaction: {type:Number, required:false, default:0},
    depositAddress:{type:String, required:false},
    derivationKey:{type:String, required:false},
    privateKey:{type:String, required:false},
    invites: {type: Number, default:0, required:false},
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;