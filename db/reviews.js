// 引入 models
const models = require("../models");
const code = require('../lib/code');
const JWT = require('jsonwebtoken');


queryIfOwnReview = async (userId,reviewId) =>{
    try{
        //判断是否是管理员
        if(userId==1){
            return true
        }
        else{
            let res = await models.reviews.findAll({
                where:{
                    user_id:userId,
                    review_id:reviewId
                }
            })
            return res.length>0?true:false
        }
    }
    catch(e){
        return false
    }
}


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
        let parms = {
            user_id: userJwt.userId.userId,
            book_id:book_id.id,
            img_url:request.payload.img_url,
            content:request.payload.content,
            star:request.payload.star
        }
        if(request.payload.title){
            parms['title'] = request.payload.title
        }
        await models.reviews.create(parms)
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}

modifyReviewById = async (request) => {
    try{
        let userJwt = JWT.decode(request.headers.authorization);
        let ifRight = await queryIfOwnReview(userJwt.userId.userId,request.payload.id)
        if(!ifRight){
            return {results:{name:'parmsError',msg:'have no rights or error parms'},dataBaseError:true}
        }
        await models.reviews.update(request.payload,{where:{
            id:request.payload.id
        }})
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}

//查询所有评论
queryReviewByBook = async (request) => {
    try{
        // let userJwt = JWT.decode(request.headers.authorization);
        let { rows: results, count: totalCount } = await models.reviews.findAndCountAll({
            limit: request.query.limit,
            offset: (request.query.page - 1) * request.query.limit,
            where:{
                // user_id: userJwt.userId.userId,
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
        let ifRight = await queryIfOwnReview(userJwt.userId.userId,request.payload.id)
        if(!ifRight){
            return {results:{name:'parmsError',msg:'have no rights or error parms'},dataBaseError:true}
        }
        await models.reviews.destroy({where:{
            review_id:request.payload.id
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