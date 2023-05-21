const mongoose = require('mongoose')

const Schema = mongoose.Schema

const placeSchema = new Schema({
    
    contact:{type: String, required: true},
    courriel:{type: String, required:true},
    numero:{type: Number, required:true},
    entreprise:{type:String, required:true},
    adresse:{type: String, required: true},
    type:{type: String, required: true},
    postesDispo: {type: Number, required: true},
    description: {type: String, required: true},
    remuneration: {type: String, required: true},
    
}
    
);

module.exports = mongoose.model("Stage", placeSchema)

