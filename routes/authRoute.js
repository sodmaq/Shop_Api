const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { cacheMiddleware } = require('../middlewares/cacheMiddleware');
const router = express.Router();
const client = require('../redis');
const util = require('util');
const {
  createUser,
  loginUser,
  loginAdmin,
  getAllUser,
  getAUser,
  deleteAUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPassword,
  resetPassword,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrder,
  getAllOrders,
  updateOrderStatus
} = require('../controller/userController');

router.post('/register', createUser);
router.put('/updatePassword', authMiddleware, updatePassword);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:token', resetPassword);
router.post('/login', loginUser);
router.post('/admin-login', loginAdmin);
// routes/userRoutes.js
router.get('/all-users', cacheMiddleware('all-users'), getAllUser);
router.get('/wishList', authMiddleware, getWishlist);
router.post('/cart', authMiddleware, userCart);
router.get('/cart', authMiddleware, getUserCart);
router.delete('/empty', authMiddleware, emptyCart);
router.post('/applyCoupon', authMiddleware, applyCoupon);
router.post('/cart/cash-order', authMiddleware, createOrder);
router.get('/get-order', authMiddleware, getOrder);
router.get('/get-AllOrders', authMiddleware, getAllOrders);
router.put('/save-address', authMiddleware, saveAddress);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout);
const cacheUserById = (req, res, next) => {
  const cacheKey = `user:${req.params.id}`;
  cacheMiddleware(cacheKey)(req, res, next);
};

// Route to get a specific user by ID, with caching
router.get('/:id', cacheUserById, getAUser);

// router.get('/:id', authMiddleware, isAdmin, getAUser);
router.delete('/:id', deleteAUser);
router.put('/:id', authMiddleware, updateUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockUser);
router.put('/update-order/:id', authMiddleware, isAdmin, updateOrderStatus);

module.exports = router;
