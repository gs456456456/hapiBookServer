'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable(
    'usersUsersFollow',
    {
      id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      followedId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      followerId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    }
  ),

  down:queryInterface => queryInterface.dropTable('usersUsersFollow'),
};
