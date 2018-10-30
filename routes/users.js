const users = require('../db/users');
const code = require('../lib/code');
const utils = require('../lib/utils');
const Joi = require('joi');

const GROUP_NAME = 'user';
module.exports = [
  {
    method: 'GET',
    path: '/user/queryUserById',
    handler: async (request, reply) => {
      let request_id = request.query.id;
      let res = await users.queryUser('id', request_id);
      if (res.dataBaseError) {
        reply(code.formatCode(2, null, res.result.message))
      }
      else {
        reply(code.formatCode(1, res.result, null))
      }
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

  }
]