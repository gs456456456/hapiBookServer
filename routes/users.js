const users = require('../db/users');
const code = require('../lib/code');
const utils = require('../lib/utils');
const middleware = require('../middleware')
const Joi = require('joi');
const { paginationDefine,jwtHeaderDefine } = require('../lib/router-helper');

const GROUP_NAME = 'user';
module.exports = [
  {
    method: 'POST',
    path: `/${GROUP_NAME}/register`,
    handler: async (request, reply) => {
      let parms = request.payload;
      let res = await users.createUser(parms);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '注册',
      auth:false,
      validate: {
        payload: Joi.object().keys({
            name: Joi.string().required(),
            password:Joi.string().required()
          })
      },
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/login`,
    handler: async (request, reply) => {
      let parms = request.payload;
      let res = await users.queryUser(parms);
      if(res.results.length<1){
        res.dataBaseError = true
      }
      if((!res.dataBaseError)&&res.results.length>0){
          let generateKey = utils.generateJWT({
            userId: res.results[0].id
          });
          res.results = generateKey
        }
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '登陆',
      auth:false,
      validate: {
        payload: Joi.object().keys({
            name: Joi.string().required(),
            password: Joi.string().required(),
          })
      },
    }
  },
  {
    method: 'GET',
    path: `/${GROUP_NAME}/queryUserById`,
    handler: async (request, reply) => {
      let query = request.query;
      let res = await users.queryUser(query);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '根据用户ID查询用户信息',
      auth:false,
      validate: {
        query: {
          id: Joi.number().integer().required()
        }
      },
    }
  },
  {
    method: 'GET',
    path: `/${GROUP_NAME}/getUserInfo`,
    handler: async (request, reply) => {
      let res = await users.queryLoginUser(request);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '查询当前用户信息',
      validate:{
        ...jwtHeaderDefine
      },
      auth:false
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/addUser`,
    handler: async (request, reply) => {
      let parms = request.payload;
      let res = await users.createUser(parms);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '添加新用户',
      validate: {
        ...jwtHeaderDefine,
        payload: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            type:Joi.string(),
            introduction:Joi.string()
          })
      },
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/modfiyUserInfo`,
    handler: async (request, reply) => {
      let res = await users.modifyUser(request);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '修改当前用户信息',
      auth:false,
      validate: {
        ...jwtHeaderDefine,
        payload: Joi.object().keys({
            name: Joi.string(),
            password:Joi.string(),
            email: Joi.string(),
            introduction:Joi.string(),
          })
      },
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/deleteUser`,
    handler: async (request, reply) => {
      let parms = request.payload;
      let res = await users.deleteUser(parms);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '删除新用户',
      validate: {
        ...jwtHeaderDefine,
        payload: Joi.object().keys({
            id: Joi.number().required()
        })
      },
    }
  },

]