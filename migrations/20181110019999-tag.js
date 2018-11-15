// 'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'tags',
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
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
  
    },

  ),

down: queryInterface => queryInterface.dropTable('tags'),
};
