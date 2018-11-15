const JWT = require('jsonwebtoken');


function generateJWT(userId){
    const payload = {
        userId: userId,
        exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
      };
      return JWT.sign(payload, process.env.JWT_SECRET);
}

function isEmptyObject(object){
    if(typeof parms === 'object' && parms==={}){
        return true
    }
    return false
}

function encrypt (text){
    return crypto.createHash("md5").update(String(text)).digest("hex");
};
module.exports = {
    isEmptyObject:isEmptyObject,
    encrypt:encrypt,
    generateJWT:generateJWT
}