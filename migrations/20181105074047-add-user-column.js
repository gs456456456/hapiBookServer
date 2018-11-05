'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>  Promise.all([
    queryInterface.addColumn('users','password',{ type: Sequelize.STRING(20)}),
  ]),
  down: (queryInterface, Sequelize) => {

  }
};
