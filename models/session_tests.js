"use strict";
const { Model } = require("sequelize");
const dataTypes = require("sequelize/lib/data-types");
module.exports = (sequelize, DataTypes) => {
  class Session_tests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Session_tests.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
      Session_tests.belongsTo(models.Tests, {
        foreignKey: "test_id",
      });
    }
  }
  Session_tests.init(
    {
      user_id: DataTypes.INTEGER,
      test_key: DataTypes.STRING,
      test_id: DataTypes.INTEGER,
      result: DataTypes.INTEGER,
      started_at: DataTypes.DATE,
      ended_at: DataTypes.DATE,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Session_tests",
    }
  );

  return Session_tests;
};
