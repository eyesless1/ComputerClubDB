module.exports = (sequelize, DataTypes) => {
  const ComputerGroup = sequelize.define("computer_group", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Название группы (например, 'Премиум', 'Эконом')"
    },
    description: {
      type: DataTypes.TEXT,
      comment: "Описание группы"
    },
    price_multiplier: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 1.00,
      comment: "Множитель цены (1.0 - стандарт, 1.5 - премиум)"
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  return ComputerGroup;
};
