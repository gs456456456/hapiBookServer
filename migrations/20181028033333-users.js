// 'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'users',
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
      type: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      email: {
        type: Sequelize.STRING(30)
      },
      introduction: {
        type: Sequelize.STRING(50),
      },
      login_time: Sequelize.DATE,
      last_login_time: Sequelize.DATE,
      login_count: Sequelize.INTEGER,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
  
    },

  ),

down: queryInterface => queryInterface.dropTable('users'),
};
