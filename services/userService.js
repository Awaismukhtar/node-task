const User = require("../models/user");
const Company = require("../models/company");
const { where } = require("sequelize");

exports.createUser = async (data, filePath) => {
  const { firstName, lastName, email, companyId } = data;
  const profileImage = filePath || null;

  if (!firstName || !lastName || !email || !companyId) {
    throw new Error("Required fields are missing");
  }
  const user = await User.findOne({ where: { email: email } });
  if (user) throw new Error("email already taken");
  return await User.create({ firstName, lastName, email, companyId, profileImage });
};

exports.getUsersByCompany = async (companyId, page = 1, limit = 10) => {
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  const offset = (page - 1) * limit;
  try {
    const users = await User.findAll({
      where: { companyId },
      include: { model: Company, as: "company" },
      limit: limit,
      offset: offset,
    });

    const totalRecords = await User.count({ where: { companyId } });
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      page,
      totalPages,
      totalRecords,
      users,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Server error");
  }
};

exports.getUsersByCompany = async (companyId) => {
  return await User.findAll({
    where: { companyId },
    include: { model: Company, as: "company" },
  });
};

exports.updateUser = async (userId, data, filePath) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  const { firstName, lastName, email } = data;
  const profileImage = filePath || user.profileImage;

  return await user.update({ firstName, lastName, email, profileImage });
};

exports.deleteUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("User not found");

  return await user.destroy();
};
