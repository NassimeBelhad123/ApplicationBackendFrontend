const mongoose = require('mongoose')

const Schema = mongoose.Schema

const placeSchema = new Schema({
    
    numero:{type: Number, required: true},
    nom:{type: String, required: true},
    courrielEtu:{type: String, required: true},
    profilEtu: {type: String, required: true}
    
}
    
);

module.exports = mongoose.model("Etudiant", placeSchema)