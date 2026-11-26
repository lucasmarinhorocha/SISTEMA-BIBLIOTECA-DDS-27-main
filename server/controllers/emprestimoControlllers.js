const emprestimoModels = require('../models/emprestimoModels')

module.exports = {
    listar:async(req,res) =>{
        try {
            const listaEmprestimos = await emprestimoModels.listaEmp()

            // leva ao arquivo
            res.render('emprestimo/listar', {listaEmprestimos})
        } catch (error) {
            console.log(error)
            res.render("erro", { error, mensagem: "Erro ao listar os usuarios" })
        }
    }
}