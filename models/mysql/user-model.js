const SQLize = require('sequelize')
const sequelize = require('../../config/sequelize')
const bcrypt = require('bcrypt')

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
const User = sequelize.define("users", userSchema)

User.prototype.validatePassword = async (password) => {
  const validPassword = await bcrypt.
}

module.exports = { User: sequelize.define("users", userSchema) }