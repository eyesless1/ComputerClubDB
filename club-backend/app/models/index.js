const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  pool: dbConfig.pool,
  logging: console.log
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Импорт моделей
db.ComputerGroup = require("./computer_group.model.js")(sequelize, Sequelize);
db.Computer = require("./computer.model.js")(sequelize, Sequelize);
db.Client = require("./client.model.js")(sequelize, Sequelize);
db.GameSession = require("./game_session.model.js")(sequelize, Sequelize);
db.Product = require("./product.model.js")(sequelize, Sequelize);
db.Pricelist = require("./pricelist.model.js")(sequelize, Sequelize);
db.PricelistProduct = require("./pricelist_product.model.js")(sequelize, Sequelize);
db.Purchase = require("./purchase.model.js")(sequelize, Sequelize);
db.PurchaseProduct = require("./purchase_product.model.js")(sequelize, Sequelize);

// Вызов файла связей
require("./references.model.js")(db);

module.exports = db;
