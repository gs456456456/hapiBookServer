const author = require('../db/author');
const code = require('../lib/code');
const utils = require('../lib/utils');
const middleware = require('../middleware')
const Joi = require('joi');
const { paginationDefine,jwtHeaderDefine } = require('../lib/router-helper');

const GROUP_NAME = 'author';
module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}/queryAuthor`,
    handler: async (request, reply) => {
      let res = await author.queryAuthor(request);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '查询所有作者信息',
      auth:false,
      validate: {
        query: {
          ...paginationDefine
        }
      },
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/addAuthor`,
    handler: async (request, reply) => {
      let parms = request.payload;
      let res = await author.createAuthor(parms);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '添加新作者',
      validate: {
        ...jwtHeaderDefine,
        payload: Joi.object().keys({
            name: Joi.string().required(),
            country: Joi.string(),
            description: Joi.string()
        })
      },
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/modfiyAuthorInfo`,
    handler: async (request, reply) => {
      let parms = request.payload;
      let res = await author.modifyAuthor(parms);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '修改作者信息',
      validate: {
        ...jwtHeaderDefine,
        payload: Joi.object().keys({
          id: Joi.number().required(),
          name: Joi.string(),
          country: Joi.string(),
          description: Joi.string()
        })
      },
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/deleteAuthor`,
    handler: async (request, reply) => {
      let parms = request.payload;
      let res = await books.deleteAuthor(parms);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '删除作者',
      validate: {
        ...jwtHeaderDefine,
        payload: Joi.object().keys({
            id: Joi.number().required()
        })
      },
    }
  },

]