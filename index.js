const db = require("./db");

const { json } = require("express");
const express = require("express");
const app = express();
const handlebars=require('express-handlebars');
const bodyParser=require('body-parser');

//HANDLEBARS for print data in html
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')

//BODYPARSER to get data in routers
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.get('/',async (req,res)=>{
    funcionarios = await db.listEmployes()
    res.render('table',{dados:funcionarios})
});

app.post('/add',async (req,res)=>{
    await db.addEmployes(req.body)
    res.redirect('/')
})

app.get('/delete/:id',async (req,res)=>{
    await db.deleteEmployes(req.params.id)
    res.redirect('/')
})

app.listen(8081,()=>{
    console.log("Servidor rodando na url http://localhost:8081/");
})
