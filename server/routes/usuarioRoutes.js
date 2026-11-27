// IMPORTAÇÃO DO MÓDULO DO EXPRESS
const express = require("express")
const router = express.Router()

// IMPORTAR O CONTROLLER DO USUÁRIO
const usuarioControllers = require("../controllers/usuarioController")

//router.post("/", usuarioControllers.login)

router.get("/", (usuarioControllers.login))

module.exports = router