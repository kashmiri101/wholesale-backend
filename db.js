// db.js
const Sequelize = require('sequelize');



const sequelize = new Sequelize('wholesaleweb', 'postgres', 'athar', {
  host: 'localhost',
  dialect: 'postgres' 
});



async function connection() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
module.exports = { sequelize, connection };


