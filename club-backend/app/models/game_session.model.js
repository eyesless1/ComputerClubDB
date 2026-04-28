module.exports = (sequelize, DataTypes) => {
  const GameSession = sequelize.define("game_session", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    start_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    end_time: {
      type: DataTypes.DATE
    },
    total_hours: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    total_cost: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    status: {
      type: DataTypes.ENUM('active', 'completed', 'cancelled'),
      defaultValue: 'active'
    }
  });
  return GameSession;
};
