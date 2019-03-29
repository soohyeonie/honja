'use strict';
module.exports = (sequelize, DataTypes) => {
  const chatmsg = sequelize.define('chatmsg', {
    roomnumber: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  chatmsg.associate = function(models) {
    // associations can be defined here
  };
  return chatmsg;
};