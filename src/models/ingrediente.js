module.exports = (sequelize, DataTypes) => {
  const ingrediente = sequelize.define('ingrediente', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
  }, {});

  ingrediente.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    ingrediente.belongsToMany(models.hamburguesa, { through: models.hamburguesa_ingrediente, foreignKey: 'ingredienteId'})

  };

  return ingrediente;
};
