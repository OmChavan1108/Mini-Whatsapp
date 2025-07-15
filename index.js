const express=require('express')
const app=express();
const path=require('path')               //ejs
const mongoose=require('mongoose')
const Chat=require('./models/chat.js')
const methodOverride = require('method-override')                      //to override methods in form and use put,patch and delete


app.set("view engine","ejs")                        //set is use for config
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))  

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsappExpress')     //database name whatsappExpress
}

main().then((res)=>{console.log('connected with mongoose')})
.catch((err)=>{console.log(err)})

//home page
app.get('/',(req,res)=>{                       
    res.render("home.ejs")
})

//chat page having all chats
app.get('/chats',async (req,res)=>{
    let chats=await Chat.find();     //await is imp here otherwise it only print[object] awaits waits function on hold till this like work is reslove
    
    res.render("chat.ejs",{chats})
})

//page to add new chat
app.get('/chats/new', (req,res)=>{
    
    res.render('new.ejs',)
})

//fetch that added info in chats
app.post('/chats',(req,res)=>{
    let {from,to,msg,date}=req.body
    let newchat=new Chat({
        from:from,
        to:to,
        msg:msg,
         date: {
         type: Date,
         default: Date.now  // ✅ Automatically set date if not provided
  }
    })
    newchat.save().then(()=>{console.log('chat saved')}).catch((err)=>{console.log(err)})
    res.redirect('/chats')
})

//update the chat editpage
app.get('/chats/:id/edit',async (req,res)=>{
    let {id}=req.params
    let chat= await Chat.findById(id)
    res.render('edit.ejs',{chat})
})

//fetch the updation in chats page
app.put('/chats/:id', async (req,res)=>{
    let {id}=req.params
   let {msg:updatemsg}=req.body
   let updatedChat=await Chat.findByIdAndUpdate(id, {msg:updatemsg}, {runValidators:true , new:true} )
   //console.log(updatedChat)
    res.redirect('/chats')
})

app.delete('/chats/:id',async (req,res)=>{
    let {id}=req.params;
    await Chat.findByIdAndDelete(id)
    res.redirect('/chats')
})

/*Chat.create(                                           //Chat model is exported from chat.js and require here at top
    {from:"om",to:"mrin",msg:"How are you",date: new Date()}
).then((res)=>{console.log(res)})
.catch((err)=>{console.log(err)})*/

app.listen(8080,()=>{
    console.log("app is listening on port 8080")
})