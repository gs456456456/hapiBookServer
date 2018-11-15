require('env2')('./.env');
const Hapi = require('hapi');
const config = require('./config');
const routes = require('./routes');
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const log = require('./log')
const pluginHapiPagination = require('./plugins/hapi-pagination');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');




const server = new Hapi.Server();
server.connection({
  port: config.PORT,
  host: config.HOST,
});

const insert = require('inert')

const init = async () => {
  await server.register(hapiAuthJWT2);
  await server.register([
    ...pluginHapiSwagger,
    pluginHapiPagination.pageOptions,
    log.logOptions,
    insert
  ]);
  //加载jwt插件
  pluginHapiAuthJWT2(server);
  server.route([
    // 创建一个简单的hello hapi接口
    ...routes,
  ]);
  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};


init();
