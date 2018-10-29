// 引入 models
const models = require("../models");
queryUser = async (parms,value) =>{
    let _obj = {};
        _obj[parms] = value
    console.log(_obj)
    let result = await models.users.findAll({
        where: _obj
      });
      if(result!==null){
        reponseMess={
            code:1,
            message:'已经在数据库中查询到'
        }
    }else{
        reponseMess={
            code:-1,
            message:'未已经在数据库中查询到'
        }
    }
    return result
}
// user.prototype.createUser = async () => {

// }
// user.prototype.modifyUser = async () =>{

// }
// user.prototype.deleteUser = async () =>{

// }


module.exports = {
    queryUser:queryUser
}