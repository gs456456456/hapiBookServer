// 引入 models
const models = require("../models");
const code = require('../lib/code');
queryUser = async (parms) =>{
    try{
        let result = await models.users.findAll({
            where: parms
          });
        return {result:result,dataBaseError:false}
    }
    catch(e){
        return {result:e,dataBaseError:true}
    }
}

createUser = async (parms) => {
    try{
        let result = await models.users.create(parms);
        return {result:'success',dataBaseError:false}
    }
    catch(e){
        return {result:e,dataBaseError:true}
    }
}
// modifyUser = async () =>{

// }
// deleteUser = async () =>{

// }


module.exports = {
    queryUser:queryUser,
    createUser:createUser
}