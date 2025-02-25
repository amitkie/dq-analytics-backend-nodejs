const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Correctly import the sequelize instance

const OnboardingUser = sequelize.define(
  "OnboardingUser",
  {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);

module.exports = OnboardingUser;
