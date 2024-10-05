const Company = require('../models/company');

exports.createCompany = async (data) => {
  const { name, address } = data;

  if (!name) throw new Error("Company name is required");

  return await Company.create({ name, address });
};
