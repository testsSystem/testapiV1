"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answers_options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answers_options.belongsTo(models.Questions, {
        foreignKey: "question_id",
      });
    }
  }

  Answers_options.init(
    {
      answer: DataTypes.STRING,
      question_id: DataTypes.INTEGER,
      correct_answer: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Answers_options",
    }
  );
  return Answers_options;
};
