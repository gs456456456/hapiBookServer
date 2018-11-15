'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('booksReview','img_url',{ type: Sequelize.STRING })
  },
  down: (queryInterface, Sequelize) => {
  }
};
