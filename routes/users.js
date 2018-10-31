const users = require('../db/users');
const code = require('../lib/code');
const utils = require('../lib/utils');
const middleware = require('../middleware')
const Joi = require('joi');

const GROUP_NAME = 'user';
module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}/queryUserById`,
    handler: async (request, reply) => {
      let query = request.query;
      let res = await users.queryUser(query);
      middleware.dbErrorMiddleware(res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '根据用户ID查询用户信息',
      validate: {
        query: {
          id: Joi.number().integer().required()
        }
      },
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/addUser`,
    handler: async (request, reply) => {
      let parms = request.payload;
      let res = await users.createUser(parms);
      middleware.dbErrorMiddleware(res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '添加新用户',
      validate: {
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
      let parms = request.payload;
      let res = await users.modifyUser(parms);
      middleware.dbErrorMiddleware(res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '修改用户信息',
      validate: {
        payload: Joi.object().keys({
            id:Joi.number().integer().required(),
            name: Joi.string(),
            email: Joi.string(),
            type: Joi.string(),
            introduction:Joi.string()
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
      middleware.dbErrorMiddleware(res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '删除新用户',
      validate: {
        payload: Joi.object().keys({
            id: Joi.number().required()
        })
      },
    }
  },

]