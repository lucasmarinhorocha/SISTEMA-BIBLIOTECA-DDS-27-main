// IMPORTAÇÃO DO MÓDULO DO EXPRESS
const express = require("express")
const app = express()

// MÓDULO DO NODE PARA LIDAR COM CAMINHO DE ARQUIVOS
const path = require("path")

// IMPORTAR O MÓDULO DO DOTENV, LÊ O ARQUIVO .ENV, E JÁ CONFIGURA O BANCO
require('dotenv').config()

// DEFINE A PORTA DO SERVIDOR 
const port = process.env.PORT || 5000

// CONFIGURAR O EJS COMO TEMPLATE ENGINE
// define o ejs como engine do front - interpreta as páginas
app.set("view engine", "ejs")
// APONTAR PARA O EJS ONDE ESTÃO AS PÁGINAS
app.set("views", path.join(__dirname, "../client/views") )

// MIDDLEWARE PARA ENTENDER O JSON
// Lê os dados
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// configurações do express-session
const session = require("express-session")
app.use(session({ 
    secret: 'cr7',
    resave: false,
    saveUninitialized: false
}))

// disponibiliza o usuario da sessao para o EJS usuar
// DISPONIBILIZA O USUÁRIO DA SESSÃO PARA O EJS USAR
app.use((req, res, next) => {
res.locals.usuario = req.session?.usuario || null;
req.usuario = req.session?.usuario || null;
next();


})

// CRIAÇÃO DAS ROTAS
// IMPORTAR AS ROTAS DE USUÁRIO
const usuarioRoutes = require("./routes/usuarioRoutes.js")
app.use("/usuarios", usuarioRoutes)


const livroRoutes = require("./routes/livroRoutes.js")

app.use("/livros", livroRoutes)

// ROTAS PÚBLICAS
app.get("/", (req, res) => {
    res.render('index')
})

app.get("/login", (req, res) => {
    
    if (req.session.usuario){
        req.session.destroy()
    }
    res.render('login')
})

// TRAZ AS CONFIGURAÇÕES DO BANCO
const pool = require("./config/db.js");

// ROTA 404 - CASO A ROTA NÃO EXISTA
app.use((req, res) => {
    res.status(404).render("404", { url: req.originalUrl });
});

// FORÇA A CONEXÃO COM O BANCO
(async () =>{
        try{
            // SE O BANCO ESTIVER ATIVO, INICIA O SERVIDOR DO BANCO
            await pool.getConnection()
            console.log("Banco foi conectado");
            // SE O BANCO SUBIU, SOBE O BACKEND
            // FUNÇÃO PARA SUBIR O SERVIDOR
            app.listen(port, () =>{
                console.log(`Servidor na porta: ${port}`);
                console.log(`Link: http://localhost:${port}`);
            })
        }
        catch(erro){
            // SE DEU ERRO, AVISA E ENCERRA A TENTATIVA
            console.log("Erro ao conectar com o banco");
            process.exit(1)
        }
    }
)()

