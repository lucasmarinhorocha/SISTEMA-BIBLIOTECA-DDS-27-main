// IMPORTAÇÃO DO MODEL
const usuarioModels = require("../models/usuarioModels.js")

// EXPORTAR AS FUNÇÕES DO CONTROLLER
module.exports = {
  // LOGIN    
login: async (req, res) => {
    try {
        // coleta as informações do body da requisição
        const { email, senha } = req.body

        // passa as informações pro model
        const usuarioLogado = await usuarioModels.login(email, senha)

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
},
    // CRUD
    // CREATE
    criar: async (req, res) =>{
        try{
            // COLETA AS INFORMAÇÕES DO BODY DA REQUISIÇÃO
            const { nome, email, senha, perfil } = req.body

            // PASSA AS INFORMAÇÕES PRO MODEL
            await usuarioModels.criarUsuario(nome, email, senha, perfil)

            // REDIRECIONA PARA A PÁGINA DE LISTA DE USUÁRIO
            res.redirect("/usuarios")
        }
        catch(erro){
            // MOSTRA O ERRO NO TERMINAL
            console.log(erro)
            // RENDERIZA A PÁGINA DE ERRO, MOSTRANDO PRO USUÁRIO UMA MENSAGEM
            res.render("erro", {erro, mensagem: "Erro ao criar o usuário"} )
        }
    },
    // READ
  listar: async (req, res) => {
        try {
            // executa o model
            const listaUsuarios = await usuarioModels.listarUsuarios()
            
            // renderiza a tela de lista, passando o que o model te mandou
            res.render('usuarios/listar', { listaUsuarios })
        } catch (erro) {
            console.log(erro)
            res.render("erro", { erro, mensagem: "Erro ao listar os usuarios" })
        }  
    },
    // UPDATE
    atualizar: (req, res) =>{
        usuarioModels.atualizarUsuario()
        res.send("ATUALIZEI UM USUÁRIO")          
    },
    // DELETE
   // DELETE
deletar: async(req, res) => {
      try {
        const idDaUrl = req.params.id
        await usuarioModels.deletarUsuario(idDaUrl)

        // redireciona para lista usuarios
        res.redirect("/usuarios")

      } catch (erro) {
        console.log(erro)
        res.render("erro", { erro, mensagem: "Erro ao deletar o usuario" })
      }
},

renderizarEditar: async (req, res) => {
        try {
            // pegar o id vindo da URL atraves dos parametros
            const idDaUrl = req.params.id

            // chama o model para coletar as informações do usuario
            const usuarioEditado = await usuarioModels.buscarPorId(idDaUrl)

            // renderiza a pagina de editar passando as informações do usuario
            res.render("usuarios/editar", { usuarioEditado })
        } catch (erro) {
            console.log(erro)
            res.render("erro", { erro, mensagem: "Erro ao buscar o usuario" })
        }
    },

    editar: async(req,res) =>{
        try{

            //pegar o id vindo da URL atraves dos parametros

            const idDaUrl = req.params.id

            // coleta as informações do body da requisição
            const { nome, email, senha, perfil } = req.body

           // passa as informações pro model

          await usuarioModels.atualizarUsuario(idDaUrl,nome,email,senha,perfil)

            // passa as informações ro model
            res.redirect("/usuarios")


        } catch (erro) {
            console.log(erro)
            res.render("erro", { erro, mensagem: "Erro ao editar o usuario" })
    }
}
}