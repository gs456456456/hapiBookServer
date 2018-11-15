const reviews = require('../db/reviews');
const code = require('../lib/code');
const utils = require('../lib/utils');
const middleware = require('../middleware')
const Joi = require('joi');
const { paginationDefine,jwtHeaderDefine } = require('../lib/router-helper');

const GROUP_NAME = 'reviews';

module.exports = [
    {
      method: 'POST',
      path: `/${GROUP_NAME}/addReviewByBook`,
      handler: async (request, reply) => {
        let res = await reviews.addReviewByBook(request);
        middleware.dbErrorMiddleware(request,res,reply)
      },
      config: {
        tags: ['api', GROUP_NAME],
        description: '为指定的书本添加评论',
        auth:false,
        validate: {
           ...jwtHeaderDefine,
           payload: Joi.object().keys({
               book_id: Joi.number().required(),
               title:Joi.string().required(),
               star:Joi.number().required(),
               content:Joi.string().required(),
               img_url:Joi.string()
            })
        },
      }
    },
    {
      method: 'POST',
      path: `/${GROUP_NAME}/modifyReviewById`,
      handler: async (request, reply) => {
        let res = await reviews.modifyReviewById(request);
        middleware.dbErrorMiddleware(request,res,reply)
      },
      config: {
        tags: ['api', GROUP_NAME],
        description: '修改评论',
        auth:false,
        validate: {
           ...jwtHeaderDefine,
           payload: Joi.object().keys({
               id: Joi.string().required(),
               title:Joi.string(),
               star:Joi.number(),
               content:Joi.string(),
               img_url:Joi.string()
            })
        },
      }
    },
    {
      method: 'POST',
      path: `/${GROUP_NAME}/deleteReviewById`,
      handler: async (request, reply) => {
        let res = await reviews.deleteReviewById(request);
        middleware.dbErrorMiddleware(request,res,reply)
      },
      config: {
        tags: ['api', GROUP_NAME],
        description: '删除评论',
        auth:false,
        validate: {
           ...jwtHeaderDefine,
           payload: Joi.object().keys({
               id: Joi.string().required()
            })
        },
      }
    },
    {
      method: 'GET',
      path: `/${GROUP_NAME}/queryReviewByBook`,
      handler: async (request, reply) => {
        let res = await reviews.queryReviewByBook(request);
        middleware.dbErrorMiddleware(request,res,reply)
      },
      config: {
        tags: ['api', GROUP_NAME],
        description: '查询评论',
        auth:false,
        validate: {
           ...jwtHeaderDefine,
           query: {
            ...paginationDefine,
            book_id: Joi.string().required(),
          }
        },
      }
    }
]