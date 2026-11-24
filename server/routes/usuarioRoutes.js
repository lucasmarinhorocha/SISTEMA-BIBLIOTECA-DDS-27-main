// IMPORTAÇÃO DO MÓDULO DO EXPRESS
const express = require("express")
const router = express.Router()

// IMPORTAR O CONTROLLER DO USUÁRIO
const usuarioControllers = require("../controllers/usuarioControllers.js")
const { deletarUsuario } = require("../models/usuarioModels.js")

// ROTAS DO USUÁRIOS
// LOGIN
router.post("/login", usuarioControllers.login)

// CRUD
// MOSTRA A PÁGINA DE CRIAR USUÁRIO
router.get("/cadastrar", (req,res) => {
    res.render("usuarios/cadastrar");
})

// MANDAR AS INFORMAÇÕES DE CADASTRO PARA O CONTROLLER
router.post("/cadastrar", usuarioControllers.criar)

// MOSTRA A PÁGINA DE EDITAR USUÁRIO
router.get("/editar", (req,res) => {
    res.render("usuarios/editar");
})

// MOSTRA A PÁGINA DE LISTAR USUÁRIOS
router.get("/listar", usuarioControllers.listar )

router.get("/", (usuarioControllers.listar))

// Rota de deletar um usuarios
router.post("/deletar/:id",usuarioControllers.deletar)

//mostra a pagina de editar usuario
router.get("/editar/:id", usuarioControllers.renderizarEditar)
router.post("/editar/:id", usuarioControllers.editar)

// EXPORTAR O ROUTER
module.exports = router