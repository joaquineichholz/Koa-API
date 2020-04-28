module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('hamburguesas', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    nombre: {
      type: Sequelize.STRING,
    },
    precio: {
      type: Sequelize.INTEGER,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
    imagen: {
      type: Sequelize.STRING,
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

  down: (queryInterface) => queryInterface.dropTable('hamburguesas'),
};
