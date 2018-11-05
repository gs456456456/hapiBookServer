'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>  Promise.all([
    queryInterface.changeColumn('books','name',{ type: Sequelize.STRING,unique: true }),
    queryInterface.changeColumn('books','isbn',{ type: Sequelize.STRING,unique: true }),
  ]),

  down: (queryInterface, Sequelize) => {
  }
};
