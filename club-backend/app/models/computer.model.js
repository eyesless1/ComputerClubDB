module.exports = (sequelize, DataTypes) => {
  const Computer = sequelize.define("computer", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    computer_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: "PC"
    },
    cpu: {
      type: DataTypes.STRING
    },
    gpu: {
      type: DataTypes.STRING
    },
    ram_gb: {
      type: DataTypes.INTEGER
    },
    price_per_hour: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  return Computer;
};
