'use strict';
module.exports = (sequelize, DataTypes) => {
  const requestchat = sequelize.define('requestchat', {
    pnum: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    senderuserID: {
      allowNull: false,
      type: DataTypes.STRING
    },
    senderage: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    sendersex: {
      allowNull: false,
      type: DataTypes.STRING
    },
    receiveruserID: {
      allowNull: false,
      type: DataTypes.STRING
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING
    },
    borough: {
      allowNull: false,
      type: DataTypes.STRING
    },
    comment: {
      allowNull: false,
      type: DataTypes.STRING
    },
    startdate: {
      allowNull: false,
      type: DataTypes.STRING
    },
    enddate: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  requestchat.associate = function(models) {
    // associations can be defined here
  };
  return requestchat;
};