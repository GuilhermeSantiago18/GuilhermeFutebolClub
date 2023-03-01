"use strict";

const { BOOLEAN, NUMBER } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("matches", {
      id: {
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      home_team_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "home_team_id",
      },
      home_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "home_team_goals",
      },
      away_team_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "away_team_id",
      },
      away_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "away_team_goals",
      },
      in_progress: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        field: "in_progress",
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("matches");
  },
};
