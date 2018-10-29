
// 'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'authors',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      country: {
        type: Sequelize.STRING(20),
      },
      description:{
        type: Sequelize.STRING,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
  
    },

  ),

down: queryInterface => queryInterface.dropTable('authors'),
};
