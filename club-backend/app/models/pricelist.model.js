module.exports = (sequelize, DataTypes) => {
  const Pricelist = sequelize.define("pricelist", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    valid_from: {
      type: DataTypes.DATE,
      allowNull: false
    },
    valid_to: {
      type: DataTypes.DATE
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  return Pricelist;
};
