const Sequelize = require('sequelize')
const sequelize = new Sequelize (
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASS,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql'
    }
)

sequelize.authenticate().then(() => {
    console.log("Connected to MYSQL");
}).catch((error) => {
    console.log("MYSQL ERROR: " + error);
})

module.exports = sequelize