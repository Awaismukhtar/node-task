const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Company = require("./company");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Foreign key relationship
User.belongsTo(Company, {
  foreignKey: "companyId",
  as: "company",
});

module.exports = User;
