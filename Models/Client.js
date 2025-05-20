const mongoose=require('mongoose'); //Importamos mongoose 
//definimos estructura
const ClientSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    address: String,
    phone: String,

    createdAt:{
        type: Date,
        default: Date.now
    }
        
    
});

module.exports=mongoose.model('Client', ClientSchema)