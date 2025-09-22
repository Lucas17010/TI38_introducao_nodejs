const express = require("express")
const bd = require('/controllers/bd.js')
const cors = require("cors")
let app = express()
const PORT = 3200

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.get('/', (req, res) => res.send("<h1>Bem vindo a API</h1>").status(200))

//CRUD desenvolvimento de rotas para / CRUD

app.post('/api/:tabela', async (req, res) => {
    /*
    req.body ={
        nome: joaquin
        nota1: 9,
        nota2: 8,
        nota2: 7,
        nota2: 6
        bject.values(req.body) --> ['nome',' nota1','nota2','nota3','nota4']
        bject.values(req.body) --> [joaquin' ,9, 8, 7, 6] 
    */
    try {
        let dados = Object.values(req.body).map((val) = val)
        let tabela = req.params.tabela
        let respBd= await bd.inserir(tabela,dados)
        res.json(respBd).status(201)
    } catch (error) {
        res.json(erro).status(400)
    }

})

//leitura de dados
app.get('/api/:tabela',async (req, res)=>{
try {
    let tabela = req.params.tabela
    let respBd= await bd.ler(tabela)
    res.json(respBd).status(200)
} catch (error) {
    res.json(erro).status(400)
}   

})


app.get('/api/:tabela:id',async (req, res)=>{
    try {
        let {tabela, id} = req.params
        let respBd= await bd.ler(tabela, id)
        res.json(respBd).status(200)
    } catch (error) {
        res.json(erro).status(400)
    }   
    
    })
   //atulização de dados
   app.patch('/api/tabela/:id', async(req, res)=>{
try {
    let dados = Object.values(req.body).map((val)=>val)
    let{tabela,id}=req.params
    let respBd= await bd.atualizar(tabela, dados,id)
    res.json(respBd).status(200)
} catch (error) {
    res.json(erro).status(400)

}
    
})
   

//Escluir dados
app.delete('/api/:tabela:id',async (req, res)=>{
    try {
        let {tabela, id} = req.params
        let respBd= await bd.deletar(tabela, id)
        res.json(respBd).status(200)
    } catch (error) {
        res.json(erro).status(400)
    }   
    
    })
app.use((req, res) => res.send("<h1>Erro 404 - URL não encontrada</h1>").status(404))



app.listen(PORT, () => console.log(`Servidor rodando em: http://localhost:${PORT}`))