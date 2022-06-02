const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());

//conexão banco de dados
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud_desafio',
    port:3306
});

db.connect(err=>{
    if (err){console.log(err, 'err');}
    console.log('bd conectado...');
});

app.get('/func',(req,res)=>{

    let qr = `SELECT * FROM funcionarios`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,'errs');
        }
        if(result.length>0){
            res.send({
                message:'all user data',
                data: result
            });
        }
    });
}); 

app.get('/func/:id',(req,res)=>{
    let gID = req.params.id;
    let qr = `SELECT * FROM funcionarios WHERE id='${gID}'`;
    db.query(qr, (err, result)=>{
        if(err){
            console.log(err);
        }
        if(result.length>0){
            res.send({
                message:'get single data',
                data:result
            });
        }else{
            res.send({
                message:'data not found'
            });
        }
    });
});

app.post('/func',(req,res)=>{
    console.log(req.body,'createdata');

    let nome = req.body.nome;
    let mat_siape = req.body.mat_siape;
    let salario = req.body.salario;
    let cargo = req.body.cargo;
    let certificacao = req.body.certificacao;
    let qr = `INSERT INTO funcionarios(nome,mat_siape,salario,cargo,certificacao)VALUES('${nome}','${mat_siape}','${salario}','${cargo}','${certificacao}')`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }console.log(result,'result');
        res.send({
            message:'dados inseridos',
        });
    });
});
    
app.put('/func/:id',(req,res)=>{
    console.log(req.body,'updatedata');

    let qID = req.params.id;
    let nome = req.body.nome;
    let mat_siape = req.body.mat_siape;
    let salario = req.body.salario;
    let cargo = req.body.cargo;
    let certificacao = req.body.certificacao;

    let qr = `UPDATE funcionarios set nome = '${nome}', mat_siape = '${mat_siape}', salario='${salario}', cargo='${cargo}', certificacao='${certificacao}' WHERE id='${qID}'`

    db.query(qr,(err, result)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message: 'dados atualizados'
        });
    });
});

app.delete('/func/:id',(req,res)=>{
    //console.log(req.body,'deletedata');
    let qID = req.params.id;
    let qr = `DELETE FROM funcionarios WHERE id='${qID}'`;

    db.query(qr,(err, result)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message: 'dados deletados'
        }
        )
    });
});



app.listen(3000, ()=>{
    console.log('server running');
});