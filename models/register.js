'use strict';
module.exports = (sequelize, DataTypes) => {
  const register = sequelize.define('register', {
    userID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startdate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    enddate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    borough: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    targetstartage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    targetendage: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    targetsex: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  register.associate = function(models) {
    // associations can be defined here
  };
  return register;
};