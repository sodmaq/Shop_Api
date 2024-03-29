const ProductCategory = require('../model/prodCategoryModel');
const asyncHandler = require('express-async-handler');
const { validateMongoDbId } = require('../utils/validateMongoDbId');

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await ProductCategory.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCategory = await ProductCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteCategory = await ProductCategory.findByIdAndDelete(id);
    res.json({
      status: 'success',
      msg: 'successfully deleted',
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getACategory = await ProductCategory.findById(id);
    res.json({
      status: 'success',
      category: getACategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const allCategory = await ProductCategory.find();
    res.json({
      status: 'success',
      category: allCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
};
