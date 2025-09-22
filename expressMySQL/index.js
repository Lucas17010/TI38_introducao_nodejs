const express = require('express')
const path = require('path')
let con = require('./controller/bd')()
const statusCon = con?'Conectado ao banco!':''
let app = express()
const PORTA = '3201'
const BASEDIR= path.join(__dirname, 'templates')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res)=>res.sendFile(`${BASEDIR}/index.html`))
app.get('/cadastrar-alunos', (req, res)=>res.sendFile(`${BASEDIR}/cadastrar_aluno.html`))
app.get('/cadastrar-disciplinas', (req, res)=>res.sendFile(`${BASEDIR}/cadastrar_disciplina.html`))


//C - Inserir registro Aluno
app.post('/aluno', (req, res)=>{
    let dados = req.body
    dados = [dados.nome, parseFloat(dados.nota1), parseFloat(dados.nota2), parseFloat(dados.nota3), parseFloat(dados.nota4)]
    let sql = `
                INSERT INTO alunos (nome, nota1, nota2, nota3, nota4)
                VALUES (?, ?, ?, ?, ?);
    `
    con.query(sql, dados, (err, resp)=>{
        let resposta
        if(err) resposta = {...err, status:400, message: `Os dados não foram gravados`}
        else resposta = {...resp, status:201, message:`Gravado com sucesso! - ${resp.affectedRows} linha(s) afetada(s)`}
        res.json(resposta)
    })
})

// Inserindo alunos

app.post('/disciplina', (req, res)=>{
    let dados = req.body
    dados = [dados.nome, dados.professor]
    let sql = `
                INSERT INTO disciplina (nome, professor)
                VALUES (?, ?);
    `

    con.query(sql, dados, (err, resp)=>{
        let resposta
        if(err) resposta = {...err, status:400, message: `Os dados não foram gravados`}
        else resposta = {...resp, status:201, message:`Gravado com sucesso! - ${resp.affectedRows} linha(s) afetada(s)`}
        res.json(resposta)
    })
})





//R - Leitura de dados
app.get('/aluno', (req, res)=>{
    let sql = `SELECT * FROM alunos;`
    con.query(sql, (err, resp)=>{
        let resposta
        if (err) resposta = {...err, status:400}
        else resposta = {...resp, status:200}
        res.json(resposta)
    })
})

//R - Leitura de dados
app.get('/disciplina', (req, res)=>{
    let sql = `SELECT * FROM disciplina;`
    con.query(sql, (err, resp)=>{
        let resposta
        if (err) resposta = {...err, status:400}
        else resposta = {...resp, status:200}
        res.json(resposta)
    })
})




// U - Atualização
app.patch('/alunos/:id', (req, res)=>{
    let dados = req.body
    dados = [dados.nome, parseFloat(dados.nota1), parseFloat(dados.nota2), parseFloat(dados.nota3), parseFloat(dados.nota4)]
    let id = parseInt(req.params.id)
    let sql = `UPDATE express_ti38.alunos 
    SET nome=?, nota1=?, nota2=?, nota3=?, nota4=? 
    WHERE id=${id};`
    con.query(sql, dados, (err, resp)=>{
        let resposta
        if (err) resposta = {...err, status:400, message:'Falha na atualização!'}
        else resposta = {...resp, status:200, message:`Registro atualizado com sucesso!`}
        res.json(resposta)
    })
})


app.patch('/disciplina/:id', (req, res)=>{
    let dados = req.body
    dados = [(dados.nome), (dados.professor)]
    let id = parseInt(req.params.id)
    let sql = `UPDATE express_ti38.disciplina
    SET nome=?,professor=? 
    WHERE id=${id};`
    con.query(sql, dados, (err, resp)=>{
        let resposta
        if (err) resposta = {...err, status:400, message:'Falha na atualização!'}
        else resposta = {...resp, status:200, message:`Registro atualizado com sucesso!`}
        res.json(resposta)
    })
})






// D - Excluir registros
app.delete('/alunos/:id', (req, res)=>{
    let id = parseInt(req.params.id)
    let sql = `DELETE FROM alunos WHERE id=${id};`
    con.query(sql,(err, resp)=>{
        let resposta
        if (err) respota = {...err, status:400, message:'Erro na exclusão de dados.'}
        else resposta = {...resp, status:200, message:'Registro exclído com sucesso!'}
        res.json(resposta)
    })
})


app.delete('/disciplina/:id', (req, res)=>{
    let id = parseInt(req.params.id)
    let sql = `DELETE FROM disciplina WHERE id=${id};`
    con.query(sql,(err, resp)=>{
        let resposta
        if (err) respota = {...err, status:400, message:'Erro na exclusão de dados.'}
        else resposta = {...resp, status:200, message:'Registro exclído com sucesso!'}
        res.json(resposta)
    })
})











app.use((req, res)=>res.sendFile(`${BASEDIR}/404.html`))
//teste de auteração

app.listen(PORTA,()=>console.log(`Rodando em: http://localhost:${PORTA} \n${statusCon}`))

