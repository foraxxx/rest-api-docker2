'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Tasks', 'deadline', {
      type: Sequelize.DATEONLY,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Tasks', 'deadline', {
      type: Sequelize.DATE,
    });
  }
};
