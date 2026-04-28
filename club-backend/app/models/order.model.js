module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("order", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2)
    },
    order_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
  return Order;
};
