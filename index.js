const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const mysql = require('mysql')


//para poder ler o body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//onde ficarão nossos arquivos estáticos
app.use(express.static('public'))

//config do handlebars
app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')

app.get('/registrando', (req, res) => {
    res.render('form')
})

//inserindo os dados no banco local
app.post('/registrar-horas', (req, res) => {
    const disciplina = req.body.disciplina
    const horas = req.body.horas
    const descricao = req.body.descricao
    const data = req.body.data

    const query = `INSERT INTO study (disciplina, data, descricao, horas) VALUES ('${disciplina}', '${data}','${descricao}','${horas}')`

    conn.query(query, (err) => {
        if (err) {
            console.log(err);
        }

    })

    res.redirect('/registrando')
})

//retornando os dados armazenados no banco local

app.get('/registros', (req, res) => {
    const query = `SELECT * FROM study`

    conn.query(query, (err, data) => {
        if (err) {
            console.log(err);
        }
        const dados = data
        console.log(dados.id);
        res.render('data', { dados })
    })
})

//primeiro end-point
app.get('/', (req, res) => {
    res.render('home')
})


//conectando com a base de dados
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'pegasus'
})

conn.connect(err => {
    if (err !== null) {
        console.log(err);
    }
    console.log("Mysql conectado com sucesso");
})

//rodando o servidor na porta 3000
app.listen(3000)