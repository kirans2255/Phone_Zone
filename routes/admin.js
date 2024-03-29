const express = require('express');
const router = express.Router();
const passport = require('passport');

const upload = require('../multer/multer')
const adminController = require('../controllers/adminController');
const product = require('../controllers/product');
const requireAuth = require('../middleware/requireAuth');
const { isAuthenticated } = require('../middleware/authMiddleware');

// Render the home view
router.get('/admin',adminController.renderHome);

router.get('/admin/forgot-password',adminController.forgotGetPage)

router.post('/forgot-password',adminController.forgotEmailPostPage)

router.post('/resetPassword',adminController.resetPassword)

router.get('/admin/category',adminController.renderCategory)
// Render the dashboard view (requires authentication)
router.get('/admin/dash',requireAuth, isAuthenticated, adminController.renderDashboard);
// Render the product view (requires authentication)
router.get('/admin/product',requireAuth, product.renderProduct);
// Route for updating the products
router.put('/admin/product/:id',upload.array('productImage',3),product.updateProduct)
// Route for handling the addproducts form 
router.post('/addproducts',upload.array('productImage', 3), product.handleProduct);
// Route for handling the addproducts form of catgeory
router.post('/addCategory',upload.array('CategoryImage'), adminController.handleCategory);
// Route for handling the delete form 
router.delete('/delete/:id', product.deleteProduct);
// Route for handling the delete form of Category
router.delete('/deletecat/:id', adminController.deleteCategory);
// Route for updating the category
router.put('/admin/category/:id',upload.array('CategoryImage'),adminController.updateCategory)
// Route for handling the signin form submission
router.post('/signin', adminController.handleSignin);

// Route for handling logout
router.get('/logout', adminController.handleLogout);

module.exports = router;
