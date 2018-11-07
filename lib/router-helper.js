const Joi = require('joi');
const paginationDefine = {
    limit: Joi.number().integer().min(1).default(10)
      .description('每页的条目数'),
    page: Joi.number().integer().min(1).default(1)
      .description('页码数'),
    pagination: false,
  }

const jwtHeaderDefine = {
  headers: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}
module.exports = { paginationDefine,jwtHeaderDefine }