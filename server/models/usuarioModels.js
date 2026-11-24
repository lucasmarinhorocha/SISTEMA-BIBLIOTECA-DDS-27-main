// IMPORTANDO AS CONFIGURAÇÕES DO BANCO 
const db = require("../config/db.js")

// EXPORTAR AS FUNÇÕES DO MODEL
module.exports = {
    // LOGIN    
    login : async (email,senha) => {
                // VARIÁVEL PRA GUARDAR O COMANDO SQL

        const sql = "SELECT * FROM tb_usuarios where email = ? and senha = ?"

        // EXECUTA O SQL

        const [resultado] = await db.execute(sql, [email,senha])

        // RETORNA PRO CONTROLLER O RESULTADO
        return resultado[0] || null
    },
    // CRUD
    // CREATE
    criarUsuario: async (nome, email, senha, perfil) =>{
        // VARIÁVEL PRA GUARDAR O COMANDO SQL
        const sql = ` INSERT INTO tb_usuarios (nome, email, senha, perfil)
                      VALUES (?, ?, ?, ?)`
        // EXECUTA O SQL
        const [resultado] = await db.execute(sql, [nome, email, senha, perfil])

        // RETORNA PRO CONTROLLER O RESULTADO
        return resultado.insertId
    },
    // READ
    listarUsuarios: async() => {
        // VARIÁVEL PRA GUARDAR O COMANDO SQL

        const sql = 'SELECT * FROM tb_usuarios'
        // EXECUTA O SQL

        const [linhas] = await db.execute(sql)
        // RETORNA PRO CONTROLLER O RESULTADO
        return linhas
    },
    // UPDATE
    atualizarUsuario: async (id,nome,email,senha,perfil) =>{
      
        // variavel para guarda o comando sql

        const sql = 'UPDATE tb_usuarios SET nome = ?, email = ?, senha = ?, perfil = ? WHERE id_usuario = ?'

        // executa o sql

        const[resultado] = await db.execute(sql,[nome,email,senha,perfil,id])


        // retorna pro controller o resultado

        return resultado.affectedRows
    },
    // DELETE
    deletarUsuario: async(id) => {
  
     // VARIÁVEL PRA GUARDAR O COMANDO SQL
       const sql = 'DELETE FROM tb_usuarios WHERE id_usuario = ?';
     // EXECUTA O SQL
        const [resultado] = await db.execute(sql,[id])
     // RETORNA PRO CONTROLLER O RESULTADO
        return resultado.affectedRows
    
    },

    // Editar
    buscarPorId : async (id) => {
        // variavel pra guardar o comando sql

        const sql = 'SELECT * FROM tb_usuarios WHERE id_usuario = ?'
        // execua o sql

        const [resultado] = await db.execute(sql,[id])
        // retoma ao controle o resultado
        return resultado[0]

    },



    

}