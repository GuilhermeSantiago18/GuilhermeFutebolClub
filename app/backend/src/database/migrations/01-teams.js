'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', { 
      id: {
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true, 
      },
      team_name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'team_name',
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  }
};