//iniciando a aplicação
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

//definindo a view e as statics pages
app.use(express.static('public'));
app.set('view engine', 'ejs');

//
app.get('/',(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = 3;
    fetch(`http://localhost:5000/livros?_page=${page}&_limit=${limit}`) 
    .then(response => response.json())
    .then(data => {
        // Renderizar a view com os dados
        const totalPages = Math.ceil(data.length / limit);
        res.render('index', { data,
            currentPage: page,
            totalPages: totalPages
         });
    })
    .catch(error => {
        console.error('Erro ao buscar dados:', error);
    });
})

app.get('/adicionar-livro',(req,res)=>{
     res.render('addLivro')
})
app.get('/adicionar-beneficiario',(req,res)=>{
    res.render('addUsuario')
})

app.listen(3000, () => {
    console.log(`Servidor rodando na porta ${3000}`);
});