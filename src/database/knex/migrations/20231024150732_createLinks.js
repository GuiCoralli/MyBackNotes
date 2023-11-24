exports.up = knex => knex.schema.createTable("links", table =>{
    table.increments("id");
    table.text("url").notNullable();//Não aceita nulo

    table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
    // Neste caso temos um tag criada por um usuário, vinculada há uma nota (tabela de notes)
    // e vamos utilizar uma estratégia, uma função(onDelete) para deletar as tags que estão vinculadas aos links, em cascata ("CASCADE")
    table.timestamp("created_at").default(knex.fn.now());
});




exports.down = knex => knex.schema.dropTable("links");