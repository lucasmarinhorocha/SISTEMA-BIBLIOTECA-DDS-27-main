const db = require("../config/db.js")

// EXPORTAR AS FUNÇÕES DO MODEL
module.exports = {
    // LOGIN    
    login : async (cpf,senha) => {
                // VARIÁVEL PRA GUARDAR O COMANDO SQL

        const sql = "SELECT * FROM tb_tutor where cpf = ? and senha = ?"

        // EXECUTA O SQL

        const [resultado] = await db.execute(sql, [cpf,senha])

        // RETORNA PRO CONTROLLER O RESULTADO
        return resultado[0] || null
    }
}