const code = require('../lib/code');
function dbErrorMiddleware(response,reply) {
    if (response.dataBaseError) {
        reply(code.formatCode(2, null, response.results))
    }
    else {
        reply(code.formatCode(1, response.results, null))
    }
}

function authRequireMiddleware(){
    
}

module.exports = {
    dbErrorMiddleware: dbErrorMiddleware
}