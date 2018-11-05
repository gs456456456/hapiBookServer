const books = require('../db/books');
const code = require('../lib/code');
const utils = require('../lib/utils');
const middleware = require('../middleware')
const Joi = require('joi');
const { paginationDefine,jwtHeaderDefine } = require('../lib/router-helper');

const GROUP_NAME = 'book';
module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}/queryBook`,
    handler: async (request, reply) => {
      let res = await books.queryBook(request);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '查询所有书本信息',
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
    path: `/${GROUP_NAME}/addBook`,
    handler: async (request, reply) => {
      let parms = request.payload;
      let res = await books.createBook(parms);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '添加新书本',
      validate: {
        ...jwtHeaderDefine,
        payload: Joi.object().keys({
            name: Joi.string().required(),
            isbn: Joi.string().required(),
            score: Joi.number(),
            price: Joi.number().required(),
            pagecount:Joi.number(),
            binding:Joi.string(),
            description:Joi.string()
          })
      },
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/modfiyBookInfo`,
    handler: async (request, reply) => {
      let parms = request.payload;
      let res = await books.modifyBook(parms);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '修改书籍信息',
      validate: {
        ...jwtHeaderDefine,
        payload: Joi.object().keys({
          id: Joi.number().required(),
          name: Joi.string(),
          isbn: Joi.string(),
          score: Joi.number(),
          price: Joi.number(),
          pagecount:Joi.number(),
          binding:Joi.string(),
          description:Joi.string()
        })
      },
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/deleteBook`,
    handler: async (request, reply) => {
      let parms = request.payload;
      let res = await books.deleteBook(parms);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '删除书籍',
      validate: {
        ...jwtHeaderDefine,
        payload: Joi.object().keys({
            id: Joi.number().required()
        })
      },
    }
  },

]