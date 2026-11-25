const livroModels = require("../models/livroModels.js")

module.exports = {

    // Listar livros
    listar: async (req, res) => {
        try {
            const listaLivro = await livroModels.listaLivro()

            res.render("livros/lista_livro", {
                listaLivro
            })
        } catch (erro) {
            console.error(erro)

            res.status(500).render("erro", {
                erro,
                mensagem: "Erro ao listar os livros"
            })
        }
    },

    // Cadastrar novo livro
    novoLivro: async (req, res) => {
        try {
            const {
                titulo,
                autor,
                ano_publicacao,
                genero
            } = req.body

            await livroModels.novoLivro(
                titulo,
                autor,
                ano_publicacao,
                genero
            )

            res.redirect("/livros")
        } catch (erro) {
            console.error(erro)

            res.status(500).render("erro", {
                erro,
                mensagem: "Erro ao criar novo livro"
            })
        }
    },

    // Buscar livro e abrir tela de edição
    renderizarEditar: async (req, res) => {
        try {
            const idDaUrl = req.params.id

            const livroEditado = await livroModels.buscarPorId(idDaUrl)

            if (!livroEditado) {
                return res.status(404).render("erro", {
                    mensagem: "Livro não encontrado"
                })
            }

            res.render("livros/EditarLivro", {
                livroEditado
            })
        } catch (erro) {
            console.error(erro)

            res.status(500).render("erro", {
                erro,
                mensagem: "Erro ao buscar o livro para edição"
            })
        }
    },

    // Salvar edição do livro
    editarlivro: async (req, res) => {
        try {
            const idDaUrl = req.params.id
          
            const esta_disponivel = Number(req.body.esta_disponivel)

            if (![0, 1].includes(esta_disponivel)) {
                return res.status(400).render("erro", {
                    mensagem: "Valor de disponibilidade inválido"
                })
            }

            await livroModels.editarLivro(
                idDaUrl,
            
                esta_disponivel
            )

            res.redirect("/livros")
        } catch (erro) {
            console.error(erro)

            res.status(500).render("erro", {
                erro,
                mensagem: "Erro ao editar o livro"
            })
        }
    }
}