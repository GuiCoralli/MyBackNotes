exports.up = knex => knex.schema.createTable("tags", table =>{
    table.increments("id");
    table.text("name").notNullable();//Não aceito nulo

    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    // Neste caso temos um tag criada por um usuário, vinculada há uma nota (tabela de notes)
    // e vamos utilizar uma estratégia, uma função(onDelete) para deletar as tags que estão vinculadas à nota, em cascata ("CASCADE")
    table.integer("user_id").references("id").inTable("users");
    // Neste caso temos um tag criada por um usuário, vinculada há um id (tabela de usuários)
});


exports.down = knex => knex.schema.dropTable("tags");