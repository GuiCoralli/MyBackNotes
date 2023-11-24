const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require ("../providers/DiskStorage");

class UserAvatarController {
    //Função de updade, assíncrona async pegando a requisição
    async update(request, response) {
        //Na requisição, função para pegar o id do usuário que quer atualizar a imagem dele;
        const user_id = request.user.id;
        //Função para pegar o nome do arquivo que o usuário fez o upload
        const avatarFilename = request.file.filename;
        //instancia o lugar que irá salvar a imagem
        const diskStorage = new DiskStorage();
        //Função para buscar os dados do usuário, para atualizar de fato a informação do avatar do usuário;
        const user = await knex("users")
            .where({ id: user_id }).first();
        //Lógica que verifica se o usuário não existe, caso não exista vamos colocar uma mensagem de erro;
        if  (!user) {
            throw new AppError 
            ("Somente usuários autenticados tem permissão para mudar foto do Perfil", 401);
            }
        //Lógica que verifica se dentro do usuário existe um avatar , se existir um avatar eu preciso pegar a foto e deletá-la.
        if  (user.avatar){
            await diskStorage.deleteFile(user.avatar);
        }
        // Função que irá pegar a nova foto e salvar dentro do arquivo do avatar.
        const filename = await diskStorage.saveFile(avatarFilename);
        user.avatar = filename;
        // Função para o usuário salvar/onde irá atualizar a partir de um usuário específico
        await knex("users").update(user).where({ id: user_id });
        // Função que retorna o usuário com a imagem atualizada
        return response.json(user);
  
    }
}

module.exports = UserAvatarController