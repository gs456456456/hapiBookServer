// 引入 models
const models = require("../models");
const code = require('../lib/code');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const JWT = require('jsonwebtoken');

queryBook = async (request) =>{
    try{
        let { rows: results, count: totalCount } = await models.books.findAndCountAll({
            limit: request.query.limit,
            offset: (request.query.page - 1) * request.query.limit,
            include: {
                model: models.authors
              }
          });
        return {results:results,totalCount:totalCount,dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}

queryBookById = async (request) =>{
    try{
        let { rows: results, count: totalCount } = await models.books.findAndCountAll({
            limit: request.query.limit,
            offset: (request.query.page - 1) * request.query.limit,
            where:{
                id:request.query.id
            },
            include: {
                model: models.authors
              }
          });
        return {results:results,totalCount:totalCount,dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}

queryQualityBook = async (request) =>{
    try{
        let { rows: results, count: totalCount } = await models.books.findAndCountAll({
            limit: request.query.limit,
            offset: (request.query.page - 1) * request.query.limit,
            include: {
                model: models.authors
            },
            where:{
                score:{
                   [Op.gt]: 9
                }
            },
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

queryCollectBook = async (request) =>{
    try{
        let userJwt = JWT.decode(request.headers.authorization);
        let { rows: results, count: totalCount } = await models.collect.findAndCountAll({
            limit: request.query.limit,
            offset: (request.query.page - 1) * request.query.limit,
            include: [{
                model: models.users,
            },{
                model: models.books,
                include:{model:models.authors}
            }],
            where:{
                userId: userJwt.userId.userId
            }
          });
        return {results:results,totalCount:totalCount,dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}


cancelCollectBook = async (request) =>{
    try{
        let userJwt = JWT.decode(request.headers.authorization);
        let parms = {
            userId: userJwt.userId.userId,
            bookId:request.payload.book_id
        }
        await models.collect.destroy({where:parms});
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}


addCollectBook = async (request) =>{
    try{
        let userJwt = JWT.decode(request.headers.authorization);
        let book_id = await models.books.find({
            where:{
                id:request.payload.book_id
            }
        })
        if(!book_id){
            return {results:{name:'noResultError',msg:'book is not found'},dataBaseError:true}
        }
        let collect = await models.collect.find({
            where:{
                userId: userJwt.userId.userId,
                bookId:book_id.id
            }
        })
        if(collect){
            return {results:{name:'noRepeatError',msg:'book has already been collected'},dataBaseError:true}
        }
        let parms = {
            userId: userJwt.userId.userId,
            bookId:book_id.id
        }
        await models.collect.create(parms)
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
    searchBook:searchBook,
    queryBookById:queryBookById,
    queryQualityBook:queryQualityBook,
    addCollectBook:addCollectBook,
    cancelCollectBook:cancelCollectBook,
    queryCollectBook:queryCollectBook
}