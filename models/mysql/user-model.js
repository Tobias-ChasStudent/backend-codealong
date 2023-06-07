const SQLize = require('sequelize')
const sequelize = require('../../config/sequelize')

const userSchema = {
  user_id: {
    type: SQLize.DataTypes.INTEGER,
    allowNull: false
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

const User = sequelize.define("users", userSchema);