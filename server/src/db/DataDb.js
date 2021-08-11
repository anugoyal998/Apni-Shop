const ProductModel = require("../model/ProductSchema.js");
const ProductData = require("../defaultdata/ProductData.js");
const DataDb = async (req, res) => {
  try {
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(ProductData);
    console.log("Product Data imported successfully")
  } catch (error) {
    console.log("Error in importing data to db", error);
  }
};

module.exports = DataDb;