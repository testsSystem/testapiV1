module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Session_tests",
      "status",
      Sequelize.BOOLEAN
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Session_tests", "status");
  },
};
