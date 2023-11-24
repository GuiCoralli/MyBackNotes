//Módulo para lidar com caminhos e diretórios
const path = require("path");

//Módulo para lidar com upload de arquivos
const multer = require("multer");

//Módulo para gerar nomes cryptografados e evitar conflitos
const crypto = require ("crypto");

//Caminho para a pasta temporária
const TMP_FOLDER = path.resolve(__dirname, "..", ".." ,"tmp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

const MULTER = {
    //Mecanismo de armazenamento fornecido pelo multer para armazenar os arquivos em disco.
    storage: multer.diskStorage({
        //Indica o local temporário onde os arquivos serão armazenados
        destination: TMP_FOLDER,
        filename(request, file, callback){
            //Uma hash é gerada e convertida no formato string em Hexadecimal
            const fileHash = crypto.randomBytes(10).toString("hex");
            //o nome gerado pela 'Hash' é concatenado com o nome do arquivo original e
            //armazenado na constante
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};

module.exports ={
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER,
}