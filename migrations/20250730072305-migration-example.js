'use strict';

const { DataTypes } = require('@sequelize/core');

module.exports = {
  async up(queryInterface) {
    // Step 1: Create the table
    await queryInterface.createTable('Person', {
      name: DataTypes.STRING,
      bool: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });

    // Step 2: Add the special rule (index)
    await queryInterface.addIndex('Person', ['name', 'bool'], {
      unique: true,
      where: {
        bool: true,
      },
    });
  },

  async down(queryInterface) {
    // This removes the table when you undo the migration
    await queryInterface.dropTable('Person');
  },
};
