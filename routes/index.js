const users = require('./users')
const books = require('./books')
const auth = require('./auth')
const author = require('./author')
const reviews = require('./reviews')


module.exports = [
    ...users,
    ...books,
    ...auth,
    ...author,
    ...reviews,
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