const SQLize = require('sequelize')
const sequelize = require('../../config/sequelize')

const userSchema = {
  userId: {
    type: SQLize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "user_id"
  },
  username: {
    type: SQLize.DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: SQLize.DataTypes.STRING,
    allowNull: true
  },
  hash: {
    type: SQLize.DataTypes.STRING,
    allowNull: false
  }
}

module.exports = sequelize.define("users", userSchema);