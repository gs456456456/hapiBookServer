// 引入 models
const models = require("../models");
const code = require('../lib/code');
queryBook = async (request) =>{
    try{
        let { rows: results, count: totalCount } = await models.books.findAndCountAll({
            limit: request.query.limit,
            offset: (request.query.page - 1) * request.query.limit,
          });
        return {results:results,totalCount:totalCount,dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}
createBook = async (parms) => {
    try{
        let result = await models.books.create(parms);
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}
modifyBook = async (parms) =>{
    try{
        await models.books.update(parms,
            {where: {id: parms.id}});
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}
deleteBook = async (parms) =>{
    try{
         await models.books.destroy(
            {where: {id: parms.id}});
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}


module.exports = {
    queryBook:queryBook,
    createBook:createBook,
    modifyBook:modifyBook,
    deleteBook:deleteBook
}