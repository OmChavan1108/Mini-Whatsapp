//We will only one this file directly to import documents in Chat collection
let mongoose=require('mongoose');
const Chat=require('./chat.js')      //chat is model having Schema imported from ./chat.js

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsappExpress')
}
main().then((res)=>{console.log('data enter successfully')})
/*
Chat.insertMany([
    {from:"Ram",to:"Sam",msg:"Ky re ky kartoy appa",date:Date()},
    {from:"kane",to:"Bob",msg:"Jevan zhala ka",date: new Date()},
    {from:"Ritz",to:"Ram",msg:"Mg exam kadi pasna aahe",date:new Date()},
    {from:"Wash",to:"Maya",msg:"Baki sagla thik",date:Date()},
    {from:"lantan",to:"Kapra",msg:"Ajj india Pakistan Match aahe",date:new Date()},
    {from:"Ram",to:"om",msg:"Sale aahe amazon var",date:Date()}
]).then((res)=>{console.log(res)})

Chat.create({from:"Ganu",to:"Dinu",msg:"Ky re ky kartoy appa",date:Date()})
.then((res)=>{console.log(res)})
.catch((err)=>{console.log})*/