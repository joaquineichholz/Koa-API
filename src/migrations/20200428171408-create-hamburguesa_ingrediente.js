module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('hamburguesa_ingredientes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    hamburguesaId: {
      type: Sequelize.INTEGER,
    },
    ingredienteId: {
      type: Sequelize.INTEGER,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('hamburguesa_ingredientes'),
};
