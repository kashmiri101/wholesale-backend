const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Inquiry = sequelize.define('Inquiry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  company: DataTypes.STRING,
  email: DataTypes.STRING,
  inquiry: DataTypes.STRING,
  message: DataTypes.TEXT,
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'inquiries',
  timestamps: false
});

module.exports = Inquiry;
