const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const OnboardingOrganizationDetails = sequelize.define('OnboardingOrganizationDetails', {
    organization_name: { type: DataTypes.STRING, allowNull: false },
    company_website: { type: DataTypes.STRING },
    organization_category: { type: DataTypes.STRING },
    geography: { type: DataTypes.STRING },
}, { timestamps: true });

OnboardingOrganizationDetails.belongsTo(User, { foreignKey: 'user_id' });

module.exports = OnboardingOrganizationDetails;
