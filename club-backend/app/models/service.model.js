module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define("service", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('drink', 'food', 'snack', 'other'),
      defaultValue: 'other'
    }
  });
  return Service;
};
