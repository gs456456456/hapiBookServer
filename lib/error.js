function dataBaseError(cb){
    try{
        let result = cb()
        return {result:result,dataBaseError:false}
    }
    catch(e){
        return {result:e,dataBaseError:true}
    }
}

module.exports = {
    dataBaseError:dataBaseError
}