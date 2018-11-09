'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>  Promise.all([
    queryInterface.changeColumn('authors','name',{ type: Sequelize.STRING,unique: true }),
    queryInterface.addColumn('books','publishingFirm',{ type: Sequelize.STRING }),
  ]),

  down: (queryInterface, Sequelize) => {
  }
};
