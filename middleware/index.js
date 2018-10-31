const code = require('../lib/code');
function dbErrorMiddleware(response,reply) {
    if (response.dataBaseError) {
        reply(code.formatCode(2, null, response.result.message))
    }
    else {
        reply(code.formatCode(1, response.result, null))
    }
}

function authRequireMiddleware(){

}

module.exports = {
    dbErrorMiddleware: dbErrorMiddleware
}