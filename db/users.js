// 引入 models
const models = require("../models");
const JWT = require('jsonwebtoken');

_judgeAdmin = (obj) =>{
    if(obj.type==='admin'){
        return true
    }
    return false
}

queryUser = async (parms) =>{
    try{
        let result = await models.users.findAll({
            where: parms,
            attributes:['id','name','email','introduction','created_at','updated_at']
          });
        return {results:result,dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}

queryLoginUser = async (request) =>{
    try{
        let userJwt = JWT.decode(request.headers.authorization)
        let result = await models.users.findAll({
            where: {'id':userJwt.userId.userId},
            attributes:['id','name','email','introduction','created_at','updated_at']
          });
        return {results:result,dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}

createUser = async (parms) => {
    try{
        // parms.isAdmin = _judgeAdmin(parms);
        let result = await models.users.create(parms);
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}
modifyUser = async (request) =>{
    try{
        let userJwt = JWT.decode(request.headers.authorization);
        await models.users.update(request.payload,
            {where: {id: userJwt.userId.userId}});
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}
deleteUser = async (parms) =>{
    try{
        await models.users.destroy(
           {where: {id: parms.id}});
       return {results:'success',dataBaseError:false}
   }
   catch(e){
       return {results:e,dataBaseError:true}
   }
}


module.exports = {
    queryUser:queryUser,
    createUser:createUser,
    modifyUser:modifyUser,
    deleteUser:deleteUser,
    queryLoginUser:queryLoginUser
}