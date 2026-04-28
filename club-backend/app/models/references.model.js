// Файл для определения связей между сущностями
// Все связи вынесены сюда для удобства

module.exports = (db) => {
  // ========== Связи для компьютерного клуба ==========

  // Product -> PricelistProduct (один ко многим)
  db.Product.hasMany(db.PricelistProduct);
  db.PricelistProduct.belongsTo(db.Product);

  // Pricelist -> PricelistProduct (один ко многим)
  db.Pricelist.hasMany(db.PricelistProduct);
  db.PricelistProduct.belongsTo(db.Pricelist);

  // Purchase -> PurchaseProduct (один ко многим)
  db.Purchase.hasMany(db.PurchaseProduct);
  db.PurchaseProduct.belongsTo(db.Purchase);

  // Product -> PurchaseProduct (один ко многим)
  db.Product.hasMany(db.PurchaseProduct);
  db.PurchaseProduct.belongsTo(db.Product);

  // Client -> Purchase (один ко многим)
  db.Client.hasMany(db.Purchase);
  db.Purchase.belongsTo(db.Client);

  // GameSession -> Purchase (один ко многим)
  db.GameSession.hasMany(db.Purchase);
  db.Purchase.belongsTo(db.GameSession);

  // ComputerGroup -> Computer (один ко многим) - уже было
  // ComputerGroup.hasMany(db.Computer);
  // db.Computer.belongsTo(db.ComputerGroup);

  return db;
};
