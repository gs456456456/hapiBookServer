
// 'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'booksAuthor',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      book_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'books',
          key: 'id'
        }
      },
      author_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'authors',
          key: 'id'
        }
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
  
    },

  ),

down: queryInterface => queryInterface.dropTable('booksAuthor'),
};
