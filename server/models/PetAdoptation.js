const mongoose=require('mongoose')
const PetAdoptationSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    cpf:String,
    cellphone:String,
    confirmPassword :String
})
const PetModel=mongoose.model("signup",PetAdoptationSchema)
module.exports = PetModel

