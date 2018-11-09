'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('books','book_created_date',{ type: Sequelize.STRING })
  },
  down: (queryInterface, Sequelize) => {
  }
};
