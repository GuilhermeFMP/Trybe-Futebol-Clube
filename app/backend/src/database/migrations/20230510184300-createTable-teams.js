module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTERGER,
      },
      team_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  }
};
