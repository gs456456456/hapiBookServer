// 引入 models
const models = require("../models");
module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: async (request, reply) => {
      // 通过 await 来异步查取数据
      console.log(models.users)
      var result = await models.users.findAll({attributes:['id', 'name']});
      if(result){
        console.log(1)
        reply(result)
      }
      else{
        console.log(2)
        reply(JSON.parse({
          code:1
        }))
      }
    }
  }
]