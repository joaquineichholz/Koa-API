'use strict';
module.exports = (sequelize, DataTypes) => {
  const ingrediente = sequelize.define('ingrediente', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {});
  ingrediente.associate = function(models) {
    // associations can be defined here
  };
  return ingrediente;
};