'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // 필드 추가
    return queryInterface.addColumn('Shops', 'geo',{
      type: Sequelize.DataTypes.GEOMETRY('POINT')
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // 필두 제거
    return queryInterface.removeColumn('Shops', 'geo')
  }
};
