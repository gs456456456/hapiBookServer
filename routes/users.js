const users = require('../db/users');

module.exports = [
  {
    method: 'GET',
    path: '/user/queryUserById',
    handler: async (request, reply) => {
      // 通过 await 来异步查取数据
      try{
       let res =  users.queryUser('id',1);
        reply(res)
      }
      catch(e){
        console.log(e)
      }
    }
  }
]