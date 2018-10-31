'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>  Promise.all([
    queryInterface.changeColumn('users','email',{ type: Sequelize.STRING,unique: true }),
    queryInterface.changeColumn('users','name',{ type: Sequelize.STRING,unique: true }),
  ]),

  down: (queryInterface, Sequelize) => {
  }
};
