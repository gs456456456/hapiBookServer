// 引入 models
const models = require("../models");


queryAuthor = async (parms) =>{
    try{
        let result = await models.authors.findAll({
            where: parms
          });
        return {results:result,dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}

createAuthor = async (parms) => {
    try{
        let result = await models.authors.create(parms);
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}
modifyAuthor = async (parms) =>{
    try{
        await models.authors.update(parms,
            {where: {id: parms.id}});
        return {results:'success',dataBaseError:false}
    }
    catch(e){
        return {results:e,dataBaseError:true}
    }
}
deleteAuthor = async (parms) =>{
    try{
        await models.authors.destroy(
           {where: {id: parms.id}});
       return {results:'success',dataBaseError:false}
   }
   catch(e){
       return {results:e,dataBaseError:true}
   }
}


module.exports = {
    queryAuthor:queryAuthor,
    createAuthor:createAuthor,
    modifyAuthor:modifyAuthor,
    deleteAuthor:deleteAuthor
}