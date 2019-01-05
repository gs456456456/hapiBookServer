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
    method: 'GET',
    path: `/${GROUP_NAME}/queryCollectBook`,
    handler: async (request, reply) => {
      let res = await books.queryCollectBook(request);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '查询收藏书本信息',
      auth:false,
      validate: {
        ...jwtHeaderDefine,
        query: {
          ...paginationDefine
        }
      },
    }
  },
  {
    method: 'GET',
    path: `/${GROUP_NAME}/queryQualityBook`,
    handler: async (request, reply) => {
      let res = await books.queryQualityBook(request);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '查询精品书本',
      auth:false,
      validate: {
        query: {
          ...paginationDefine
        }
      },
    }
  },
  {
    method: 'GET',
    path: `/${GROUP_NAME}/queryBookById`,
    handler: async (request, reply) => {
      let res = await books.queryBookById(request);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '查询指定书本信息',
      auth:false,
      validate: {
        query: {
          ...paginationDefine,
          id:Joi.number().required()
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
            description:Joi.string(),
            publishingFirm:Joi.string(),
            author_id:Joi.number().required(),
            img_url:Joi.string(),
            book_created_date:Joi.date()
          })
      },
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/addCollectBook`,
    handler: async (request, reply) => {
      let parms = request.payload;
      let res = await books.addCollectBook(request);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '添加收藏',
      auth:false,
      validate: {
        ...jwtHeaderDefine,
        payload: Joi.object().keys({
          book_id: Joi.number().required(),
          })
      },
    }
  },
  {
    method: 'POST',
    path: `/${GROUP_NAME}/cancelCollectBook`,
    handler: async (request, reply) => {
      let parms = request.payload;
      let res = await books.cancelCollectBook(request);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '取消收藏',
      auth:false,
      validate: {
        ...jwtHeaderDefine,
        payload: Joi.object().keys({
          book_id: Joi.number().required(),
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
          description:Joi.string(),
          img_url:Joi.string(),
          book_created_date:Joi.date(),
          publishingFirm: Joi.string()

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
  {
    method: 'GET',
    path: `/${GROUP_NAME}/searchBook`,
    handler: async (request, reply) => {
      let res = await books.searchBook(request);
      middleware.dbErrorMiddleware(request,res,reply)
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '按照指定条件搜索书本',
      auth:false,
      validate: {
        query: {
          ...paginationDefine,
          keyname:Joi.string(),
          keyvalue: Joi.string()
        }
      },
    }
  }
]