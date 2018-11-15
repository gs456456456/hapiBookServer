// 引入 models
const models = require("../models");
const code = require('../lib/code');
const JWT = require('jsonwebtoken');

addReviewByBook = async (request) => {
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
        await models.reviews.create({
            user_id: userJwt.userId.userId,
            book_id:book_id.id,
            img_url:request.payload.img_url,
            title:request.payload.title,
            content:request.payload.content,
            star:request.payload.star
        })
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}

modifyReviewById = async (request) => {
    try{
        let userJwt = JWT.decode(request.headers.authorization);
        await models.reviews.update(request.payload,{where:{
            id:request.payload.id
        }})
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}

queryReviewByBook = async (request) => {
    try{
        let userJwt = JWT.decode(request.headers.authorization);
        let { rows: results, count: totalCount } = await models.reviews.findAndCountAll({
            limit: request.query.limit,
            offset: (request.query.page - 1) * request.query.limit,
            where:{
                user_id: userJwt.userId.userId,
                book_id:request.query.book_id
            }
          });
        return {results:results,totalCount:totalCount,dataBaseError:false}
        // await models.reviews.findAndCountAll(request.payload,{where:{
        //     id:request.payload.id
        // }})
        // return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}

deleteReviewById = async (request) => {
    try{
        let userJwt = JWT.decode(request.headers.authorization);
        await models.reviews.destroy({where:{
            id:request.payload.id
        }})
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}

module.exports = {
    addReviewByBook:addReviewByBook,
    modifyReviewById:modifyReviewById,
    queryReviewByBook:queryReviewByBook,
    deleteReviewById:deleteReviewById
}