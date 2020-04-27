'use strict';
module.exports = (sequelize, DataTypes) => {
  const ingrediente = sequelize.define('ingrediente', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {});
  ingrediente.associate = function(models) {
    // associations can be defined here
    ingrediente.belongsToMany(models.hamburguesa, { through: {models: hamburguesa_ingrediente, unique: true}});
  };
  return ingrediente;
};