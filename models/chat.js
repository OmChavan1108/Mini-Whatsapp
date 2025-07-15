const mongoose=require('mongoose')

const chatSchema=new mongoose.Schema({             //here only schema and model define so no need of mongoose.connect
    from:{
        type:String
    },
    to:{
        type:String
    },
    msg:{
        type:String,
        maxLength:50
    },
    date:{
        type:Date
    }
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports=Chat;