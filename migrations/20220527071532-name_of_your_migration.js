"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const changeTests = await queryInterface.changeColumn("Tests", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Users",
        },
        key: "id",
      },
      allowNull: false,
    });
    const changeSession = await queryInterface.changeColumn(
      "Session_tests",
      "user_id",
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        allowNull: false,
      }
    );
    const changeSession_id = await queryInterface.changeColumn(
      "Session_tests",
      "test_id",
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Tests",
          },
          key: "id",
        },
        allowNull: false,
      }
    );
    const changeQuestions = await queryInterface.changeColumn(
      "Questions",
      "test_id",
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Tests",
          },
          key: "id",
        },
        allowNull: false,
      }
    );
    const chnageOptions = await queryInterface.changeColumn(
      "Answers_options",
      "question_id",
      {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Questions",
          },
          key: "id",
        },
        allowNull: false,
      }
    );
    return Promise.all([
      changeTests,
      changeSession,
      changeSession_id,
      changeQuestions,
      chnageOptions,
    ]);
  },

  async down(queryInterface, Sequelize) {
    return;
    // Promise.all([
    //   queryInterface.removeColumn("Tests", "user_id"),
    //   queryInterface.removeColumn("Session_tests", "user_id"),
    //   queryInterface.removeColumn("Session_tests", "test_id"),
    //   queryInterface.removeColumn("Questions", "test_id"),
    //   queryInterface.removeColumn("Answers_options", "question_id"),
    // ]);
  },
};
