// 引入 models
const models = require("../models");
const code = require('../lib/code');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

searchBook = async (request) => {
    try{
        if(request.query.keyvalue && request.query.keyname){
            let findObj = {
                limit: request.query.limit,
                offset: (request.query.page - 1) * request.query.limit,
            }
            //根据作者关联查询
            if(request.query.keyname=='author'){
                findObj['include'] = [{
                    model:models.authors,
                    where: {name:{[Op.like]:'%' +request.query.keyvalue + '%'}}
                }]
            }
            else{
                //非关联
                let keyValue = request.query.keyvalue
                let key = request.query.keyname
                findObj['where'] = {}
                findObj['where'][key] = {[Op.like]:'%' +keyValue + '%'}
            }
            let { rows: results, count: totalCount } = await models.books.findAndCountAll(findObj);
            return {results:results,totalCount:totalCount,dataBaseError:false}
        }
        else{
            return {results:'lack parms',dataBaseError:true}
        }
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
    deleteBook:deleteBook,
    searchBook:searchBook
}