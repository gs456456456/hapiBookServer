require('env2')('./.env');
const Hapi = require('hapi');
const config = require('./config');
const routes = require('./routes');
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const log = require('./log')

const server = new Hapi.Server();
server.connection({
  port: config.PORT,
  host: config.HOST,
});



const init = async () => {
  await server.register([
    // 为系统使用 hapi-swagger
    ...pluginHapiSwagger,
    log.logOptions
  ]);
  server.route([
    // 创建一个简单的hello hapi接口
    ...routes,
  ]);
  // 启动服务
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};


init();
