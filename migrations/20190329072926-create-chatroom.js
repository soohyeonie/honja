'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('chatrooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user1: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user2: {
        allowNull: false,
        type: Sequelize.STRING
      },
      roomnumber: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      roomname: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('chatrooms');
  }
};