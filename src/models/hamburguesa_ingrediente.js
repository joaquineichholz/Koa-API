module.exports = (sequelize, DataTypes) => {
  const hamburguesa_ingrediente = sequelize.define('hamburguesa_ingrediente', {
    hamburguesaId: DataTypes.INTEGER,
    ingredienteId: DataTypes.INTEGER,
  }, {});

  hamburguesa_ingrediente.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return hamburguesa_ingrediente;
};
