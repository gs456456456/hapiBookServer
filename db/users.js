// 引入 models
const models = require("../models");
const code = require('../lib/code');

_judgeAdmin = (obj) =>{
    if(obj.type==='admin'){
        return true
    }
    return false
}

queryUser = async (parms) =>{
    try{
        let result = await models.users.findAll({
            where: parms
          });
        return {results:result,dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}

createUser = async (parms) => {
    try{
        parms.isAdmin = _judgeAdmin(parms);
        let result = await models.users.create(parms);
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        // if(e.name==='SequelizeUniqueConstraintError'){
        //     let msg = e.fields
        // }
        return {results:e,dataBaseError:true}
    }
}
modifyUser = async (parms) =>{
    try{
        parms.isAdmin = _judgeAdmin(parms);
        await models.users.update(parms,
            {where: {id: parms.id}});
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
    deleteUser:deleteUser
}