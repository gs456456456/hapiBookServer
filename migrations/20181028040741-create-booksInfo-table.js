'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'booksInfo',
    {
      id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title:{
        type: Sequelize.STRING(20),
        allowNull: false
      },
      from:{
        type: Sequelize.STRING(10)
      },
      content:{
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    }
  ),

  down:queryInterface => queryInterface.dropTable('booksinfo'),
};
