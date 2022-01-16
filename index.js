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