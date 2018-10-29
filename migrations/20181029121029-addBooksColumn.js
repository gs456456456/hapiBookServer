'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>  Promise.all([
    queryInterface.removeColumn('books','author'),
    queryInterface.addColumn('books','score',{ type: Sequelize.INTEGER }),
    queryInterface.addColumn('books','score-people-count',{ type: Sequelize.INTEGER }),
    queryInterface.addColumn('books','price',{ type: Sequelize.INTEGER }),
    queryInterface.addColumn('books','pagecount',{ type: Sequelize.INTEGER }),
    queryInterface.addColumn('books','binding',{ type: Sequelize.STRING }),
    queryInterface.addColumn('books','description',{ type: Sequelize.STRING }),
    queryInterface.addColumn('books','book-created-date',{ type: Sequelize.DATE }),
  ]),
  down: (queryInterface, Sequelize) => {

  }
};
