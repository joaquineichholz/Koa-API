'use strict';
module.exports = (sequelize, DataTypes) => {
  const hamburguesa_ingrediente = sequelize.define('hamburguesa_ingrediente', {
    hamburguesaId: DataTypes.INTEGER,
    ingredienteId: DataTypes.INTEGER
  }, {});
  hamburguesa_ingrediente.associate = function(models) {
    // associations can be defined here
  };
  return hamburguesa_ingrediente;
};