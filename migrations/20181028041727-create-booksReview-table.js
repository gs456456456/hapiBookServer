'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'booksReview',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      star:{
        type: Sequelize.INTEGER,
        max:5
      },
      book_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'books',
          key: 'id'
        }
      },
      user_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'books',
          key: 'id'
        }
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    }
  ),

  down: queryInterface => queryInterface.dropTable('booksReview'),
};
