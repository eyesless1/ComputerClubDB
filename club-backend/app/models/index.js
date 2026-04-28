const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  pool: dbConfig.pool
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Импорт моделей
db.Client = require("./client.model.js")(sequelize, Sequelize);
db.Computer = require("./computer.model.js")(sequelize, Sequelize);
db.GameSession = require("./game_session.model.js")(sequelize, Sequelize);
db.Service = require("./service.model.js")(sequelize, Sequelize);
db.Order = require("./order.model.js")(sequelize, Sequelize);

// Связи
db.Client.hasMany(db.GameSession);
db.GameSession.belongsTo(db.Client);

db.Computer.hasMany(db.GameSession);
db.GameSession.belongsTo(db.Computer);

db.GameSession.hasMany(db.Order);
db.Order.belongsTo(db.GameSession);

db.Service.hasMany(db.Order);
db.Order.belongsTo(db.Service);

module.exports = db;
