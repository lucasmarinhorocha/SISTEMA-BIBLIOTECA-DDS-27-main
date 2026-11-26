const express = require("express")
const router = express.Router()

const livrosControllers = require("../controllers/livrosControllers.js")

// Listar livros
router.get("/", livrosControllers.listar)

// Abrir tela de cadastro
router.get("/CriarLivro", (req, res) => {
    res.render("livros/CriarLivro")
})

// Salvar novo livro
router.post("/CriarLivro", livrosControllers.novoLivro)

// Abrir tela de edição
router.get("/EditarLivro/:id", livrosControllers.renderizarEditar)

// Salvar edição do livro
router.post("/editar/:id", livrosControllers.editarlivro)

router.post("/deletar/:id",livrosControllers.delete)


module.exports = router