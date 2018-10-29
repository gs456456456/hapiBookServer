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
      user_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'books',
          key: 'id'
        }
      },
      review_id:{
        type: Sequelize.INTEGER,
        references: {
          model: 'booksReview',
          key: 'id'
        }
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    }
  ),

  down: queryInterface => queryInterface.dropTable('booksReviewChildren'),
};
