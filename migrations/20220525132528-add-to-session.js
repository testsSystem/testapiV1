module.exports = {
  up: function (queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      "Session_tests",
      "started_at",
      Sequelize.DATE
    );
  },

  down: function (queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn("Session_tests", "started_at");
  },
};
