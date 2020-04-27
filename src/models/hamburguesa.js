'use strict';
module.exports = (sequelize, DataTypes) => {
  const hamburguesa = sequelize.define('hamburguesa', {
    nombre: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    imagen: DataTypes.STRING
  }, {});
  hamburguesa.associate = function(models) {
    // associations can be defined here
    hamburguesa.belongsToMany(models.ingrediente, { through: {models: hamburguesa_ingrediente, unique: true} });

  };
  return hamburguesa;
};