// 引入 models
const models = require("../models");
const code = require('../lib/code')
queryUser = async (parms,value) =>{
    let _obj = {};
        _obj[parms] = value
    try{
        let result = await models.users.findAll({
            where: _obj
          });
        return {result:result,dataBaseError:false}
    }
    catch(e){
        return {result:e,dataBaseError:true}
    }
}

// createUser = async () => {

// }
// modifyUser = async () =>{

// }
// deleteUser = async () =>{

// }


module.exports = {
    queryUser:queryUser
}