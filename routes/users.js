const users = require('../db/users');
const code = require('../lib/code')
module.exports = [
  {
    method: 'GET',
    path: '/user/queryUserById',
    handler: async (request, reply) => {
      // 通过 await 来异步查取数据
      try{
       let res = await users.queryUser('id',1);
       if(res.dataBaseError){
         reply(code.formatCode(2,null,res.result.message))
       }
       else{
         reply(code.formatCode(1,res.result,null))
       }
      }
      catch(e){
        reply(code.formatCode(-1,null,e))
      }
    }
  }
]