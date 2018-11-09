'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('books','img_url',{ type: Sequelize.STRING })
  },

  down: (queryInterface, Sequelize) => {
  }
};
