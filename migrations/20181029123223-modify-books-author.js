'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn('books', 'author_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'authors',
        key: 'id'
      }
    }),
    queryInterface.dropTable('booksAuthor'),
  ]),

  down: (queryInterface, Sequelize) => {
  }
};
