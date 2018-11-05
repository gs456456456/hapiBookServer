const config = require('../config');
const models = require("../models");

const validate =async (decoded, request, callback) => {
  let error;
  /*
    接口 POST /users/createJWT 中的 jwt 签发规则

    const payload = {
      userId: jwtInfo.userId,
      exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60,
    };
    return JWT.sign(payload, process.env.JWT_SECRET);
  */
  // decoded 为 JWT payload 被解码后的数据
  const { userId } = decoded;
  console.log(request)



  if (!userId) {
    return callback(error, false, userId);
  }
  //验证用户权限
  let result = await models.users.find({
    where:{
      id:userId,
      isAdmin:true
    }
  });

  if(!result){
    return callback(error, false, userId);
  }


  const credentials = {
    userId,
  };
  // 在路由接口的 handler 通过 request.auth.credentials 获取 jwt decoded 的值
  return callback(error, true, credentials);
};

module.exports = (server) => {
  server.auth.strategy('jwt', 'jwt', {
    key: config.jwtSecret,
    validateFunc: validate,
  });
  server.auth.default('jwt');
};