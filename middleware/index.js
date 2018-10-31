
// {
//     statusCode:1,
//     results:null,
//     message:'success',
//     error:'',
// }     
const code = require('../lib/code');

function notUniqueError(err) {
    let path = err.errors[0].path,
        value = err.errors[0].value;
    return code.formatCode(-1, { path: path, value: value }, `${path} is not unique`, err.name)
}

function sucessRequest(response) {
    return code.formatCode(1, response.results, 'success')
}

function unKnownError(response) {
    return code.formatCode(2, null, response.results, 'dataBaseError')
}

function dbErrorMiddleware(response, reply) {
    var reply_content = null;
    if (response.dataBaseError) {
        var res = response.results;
        switch (res.name) {
            case 'SequelizeUniqueConstraintError':
                reply_content = notUniqueError(res)
                break
            default:
                reply_content = unKnownError(response)
                break
        }
    }
    else {
        reply_content = sucessRequest(response)
    }
    reply(reply_content)
}

function authRequireMiddleware() {

}

module.exports = {
    dbErrorMiddleware: dbErrorMiddleware
}