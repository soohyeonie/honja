'use strict';
module.exports = (sequelize, DataTypes) => {
  const chatroom = sequelize.define('chatroom', {
    roomnumber: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    user1: {
      allowNull: false,
      type: DataTypes.STRING
    },
    user2: {
      allowNull: false,
      type: DataTypes.STRING
    },
    roomname: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  chatroom.associate = function(models) {
    // associations can be defined here
  };
  return chatroom;
};