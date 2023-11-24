
exports.up = knex => knex.schema.createTable("notes", table =>{
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("user_id").references("id").inTable("users");
    //Uma tabela com um campo do tipo inteiro e que o (user_id) faz uma referência ao id que existe dentro da tabela do usuário.
    // Ou seja, necessariamente tem que existir um usuário para eu criar um nota (estará vinculada);

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
    
});


exports.down = knex => knex.schema.dropTable("notes");