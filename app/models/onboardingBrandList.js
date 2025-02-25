const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const OnboardingBrandList = sequelize.define('OnboardingBrandList', {
    brand_name: { type: DataTypes.STRING, allowNull: false },
}, { timestamps: true });

BrandList.belongsTo(User, { foreignKey: 'user_id' });

module.exports = OnboardingBrandList;
