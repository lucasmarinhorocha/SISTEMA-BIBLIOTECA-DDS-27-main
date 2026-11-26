const db = require("../config/db.js")

module.exports = {

    // Listar livros
    listaLivro: async () => {
        const sql = `
            SELECT *
            FROM tb_livros
            ORDER BY titulo
        `

        const [linhas] = await db.execute(sql)

        return linhas
    },

    // Cadastrar novo livro
    novoLivro: async (
        titulo,
        autor,
        ano_publicacao,
        genero,
        esta_disponivel = 1
    ) => {
        const sql = `
            INSERT INTO tb_livros
                (titulo, autor, ano_publicacao, genero, esta_disponivel)
            VALUES (?, ?, ?, ?, ?)
        `

        const [resultado] = await db.execute(sql, [
            titulo,
            autor,
            ano_publicacao,
            genero,
            esta_disponivel
        ])

        return resultado.insertId
    },

    // Buscar um livro pelo ID
    buscarPorId: async (id) => {
        const sql = `
            SELECT *
            FROM tb_livros
            WHERE id_livro = ?
        `

        const [linhas] = await db.execute(sql, [id])

        return linhas[0]
    },

    // Atualizar todos os campos do livro selecionado
    editarLivro: async (id, esta_disponivel) => {
        const sql = `
            UPDATE tb_livros
            SET 
                esta_disponivel = ?
            WHERE id_livro = ?
        `

        const [resultado] = await db.execute(sql, [
           
            esta_disponivel,
            id
        ])

        return resultado.affectedRows
    },

    deletarlivro:async(id) =>{
        const  sql = 'DELETE FROM tb_livros WHERE id_livro = ?';

        const[deletar] = await db.execute(sql,[id])

        return deletar.affectedRows
    }
}