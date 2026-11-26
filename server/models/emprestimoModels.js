const db = require("../config/db.js")

module.exports = {
    listaEmp: async () => {
        const sql = `
            SELECT
                emp.id_emprestimo,
                emp.dt_emprestimo,
                emp.dt_previsao_devolucao,
                emp.dt_devolucao,
                le.nome AS nome_leitor,
                li.titulo AS titulo_livro
            FROM tb_emprestimos AS emp
            INNER JOIN tb_leitores AS le
                ON emp.leitor = le.id_leitor
            INNER JOIN tb_livros AS li
                ON emp.livro = li.id_livro
            ORDER BY emp.dt_emprestimo DESC
        `

        const [linhas] = await db.execute(sql)

        return linhas
    }
}