const crypto = require ('crypto');
module.exports= function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX'); 
}

//especifico nada de banco de dados e api sideEffects comunicar outras ferramentas