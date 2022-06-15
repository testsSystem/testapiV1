"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tests.hasMany(models.Questions, {
        foreignKey: "test_id",
      });
      Tests.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
      Tests.hasMany(models.Session_tests, {
        foreignKey: "test_id",
      });
    }
  }
  Tests.init(
    {
      title: DataTypes.STRING,
      start_at: DataTypes.DATE,
      end_at: DataTypes.DATE,
      descriptoin: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Tests",
    }
  );
  return Tests;
};
