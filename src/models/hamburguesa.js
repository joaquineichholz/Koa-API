'use strict';
module.exports = (sequelize, DataTypes) => {
  const hamburguesa = sequelize.define('hamburguesa', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
    nombre: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    imagen: DataTypes.STRING
  }, {});
  hamburguesa.associate = function(models) {
    // associations can be defined here
  };
  return hamburguesa;
};