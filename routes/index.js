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
        path: '/{param*}',
        handler: {
            directory: {
                path: 'frontend',
                index: ['index.html', 'default.html']
            }
        },
        config:{
            auth:false
        }
      },
  ]