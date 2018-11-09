const users = require('./users')
const books = require('./books')
const auth = require('./auth')
const author = require('./author')


module.exports = [
    ...users,
    ...books,
    ...auth,
    ...author,
    {
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            request.plugins.good = {
                suppressResponseEvent: true
            };        
          reply('hello hapi');
        },
        config: {
          tags: ['api', 'tests'],
          description: '测试hello-hapi',
          plugins: {
            good: {
                suppressResponseEvent: true
                }
            }
        },
      },
  ]