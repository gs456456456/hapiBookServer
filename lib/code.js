function formatCode(code,result,errorMsg) {
    let _obj = {
        statusCode:code,
        result:result,
    }
    if(errorMsg){
        _obj['errorMsg'] = errorMsg
    }
    return _obj
}

module.exports = {
    formatCode:formatCode
}