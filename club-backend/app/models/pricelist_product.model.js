module.exports = (sequelize, DataTypes) => {
  const PricelistProduct = sequelize.define("pricelist_product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    price_override: {
      type: DataTypes.DECIMAL(10, 2),
      comment: "Особая цена для этого прайс-листа"
    }
  });
  return PricelistProduct;
};
