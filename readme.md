responseCode:
             -1 --- 数据库非重复字段已存在
             1 --- 正常
             2 --- 数据库错误
             3 --- 用户名或密码错误
             401 --- 接口未授权
             404 --- 无此页面
             400 --- 未填入必传字段
  
 
运行服务 npm i -S
        node app.js

数据库迁移 sequelize db:migrate(可能有部分字段类型需要修改)

swagger 文档 http://192.168.1.172:3002/documentation#!/
        
