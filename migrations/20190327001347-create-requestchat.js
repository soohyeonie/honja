'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('requestchats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pnum: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      senderuserID: {
        allowNull: false,
        type: Sequelize.STRING
      },
      senderage: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      sendersex: {
        allowNull: false,
        type: Sequelize.STRING
      },
      receiveruserID: {
        allowNull: false,
        type: Sequelize.STRING
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING
      },
      borough: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comment: {
        allowNull: false,
        type: Sequelize.STRING
      },
      startdate: {
        allowNull: false,
        type: Sequelize.STRING
      },
      enddate: {
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
    return queryInterface.dropTable('requestchats');
  }
};