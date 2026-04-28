const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Импорт БД
const db = require("./app/models");

// Синхронизация БД
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ База данных компьютерного клуба синхронизирована");
  })
  .catch((err) => {
    console.log("❌ Ошибка синхронизации: " + err.message);
  });

// Корневой маршрут
app.get("/", (req, res) => {
  res.json({ message: "Добро пожаловать в систему компьютерного клуба!" });
});

// API для клиентов
app.get("/api/clients", async (req, res) => {
  const clients = await db.Client.findAll();
  res.json(clients);
});

app.post("/api/clients", async (req, res) => {
  const client = await db.Client.create(req.body);
  res.json(client);
});

// API для компьютеров
app.get("/api/computers", async (req, res) => {
  const computers = await db.Computer.findAll();
  res.json(computers);
});

app.post("/api/computers", async (req, res) => {
  const computer = await db.Computer.create(req.body);
  res.json(computer);
});

// API для активных сессий
app.get("/api/active-sessions", async (req, res) => {
  const sessions = await db.GameSession.findAll({
    where: { status: 'active' },
    include: [db.Client, db.Computer]
  });
  res.json(sessions);
});

app.post("/api/start-session", async (req, res) => {
  const { client_id, computer_id } = req.body;
  
  const activeOnPc = await db.GameSession.findOne({
    where: { computer_id, status: 'active' }
  });
  if (activeOnPc) {
    return res.status(400).json({ error: "Компьютер уже занят" });
  }
  
  const session = await db.GameSession.create({
    client_id,
    computer_id,
    start_time: new Date()
  });
  res.json(session);
});

app.post("/api/end-session/:id", async (req, res) => {
  const session = await db.GameSession.findByPk(req.params.id, {
    include: [db.Computer]
  });
  if (!session) {
    return res.status(404).json({ error: "Сессия не найдена" });
  }
  
  const endTime = new Date();
  const hours = (endTime - session.start_time) / (1000 * 60 * 60);
  const totalCost = hours * session.computer.price_per_hour;
  
  session.end_time = endTime;
  session.total_hours = hours;
  session.total_cost = totalCost;
  session.status = 'completed';
  await session.save();
  
  const client = await db.Client.findByPk(session.client_id);
  client.balance = parseFloat(client.balance) - parseFloat(totalCost);
  await client.save();
  
  res.json(session);
});

// API для услуг
app.get("/api/services", async (req, res) => {
  const services = await db.Service.findAll();
  res.json(services);
});

app.post("/api/services", async (req, res) => {
  const service = await db.Service.create(req.body);
  res.json(service);
});

// API для заказов
app.post("/api/orders", async (req, res) => {
  const { session_id, service_id, quantity } = req.body;
  const service = await db.Service.findByPk(service_id);
  const total_price = service.price * quantity;
  
  const order = await db.Order.create({
    session_id,
    service_id,
    quantity,
    total_price
  });
  res.json(order);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Сервер компьютерного клуба запущен на порту ${PORT}`);
});
