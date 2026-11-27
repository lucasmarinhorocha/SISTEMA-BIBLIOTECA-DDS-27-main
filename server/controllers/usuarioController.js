const usuarioMoldesls = require("../models/usuarioMoldels")


module.exports = {

    login:async(req, res ) => {
         try {
        // coleta as informações do body da requisição
        const {cpf,senha} = req.body

        // passa as informações pro model
        const usuarioLogado = await usuarioMoldesls.login( cpf,senha)

        // se não tiver usuário, já retorna a página de erro
        if (!usuarioLogado) {
            return res.render("erro", { mensagem: "Credenciais inválidas" })
        }

        // guarda o usuário na sessão
        req.session.usuario = usuarioLogado

        // ativa a função de salvar, e garante que terá uma session
        req.session.save((erro) => {
            if (erro) {
                return res.render("erro", { erro, mensagem: "Erro ao criar sessão" })
            }

            // Se deu certo redireciona
            return res.redirect("/usuarios")
        })
    } catch (erro) {
        // mostra o erro no terminal
        console.log(erro)
        res.render("erro", { erro, mensagem: "Erro ao logar" })
    }
}
}