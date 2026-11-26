const express = require("express")
const router = express.Router()

const emprestimoController = require("../controllers/emprestimoControlllers")

router.get("/", emprestimoController.listar)

module.exports = router