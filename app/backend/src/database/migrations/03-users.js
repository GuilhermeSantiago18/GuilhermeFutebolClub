"use strict";

const { BOOLEAN, NUMBER, STRING } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        field: "username",
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
        field: "role",
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        field: "email",
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        field: "password",
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("users");
  },
};
