'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.changeColumn('booksReview','user_id',{
      type: Sequelize.INTEGER,
      references: {
          model: 'users',
          key: 'id'
      }
  })
},
  down: (queryInterface, Sequelize) => {
  }
};
