function formatCode(code,result,message = 'success',error='') {
    let _obj = {
        statusCode:code,
        result:result,
        error:error,
        message:message
    }
    return _obj
}

module.exports = {
    formatCode:formatCode
}