module.exports = (sequelize, DataTypes) => {
  const hamburguesa = sequelize.define('hamburguesa', {
    nombre: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    imagen: DataTypes.STRING,
  }, {});

  hamburguesa.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    hamburguesa.belongsToMany(models.ingrediente, { through: models.hamburguesa_ingrediente, foreignKey: 'hamburguesaId'})
  };

  return hamburguesa;
};
