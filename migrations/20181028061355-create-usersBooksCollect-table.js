'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'usersBooksCollect',
    {
      id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      bookId:{
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

  down:queryInterface => queryInterface.dropTable('usersBooksCollect'),
};
