const express = require('express');
const userSignUpController = require('../controllers/user/userSignup');
const userSigninController = require('../controllers/user/userSignin');
const authToken = require('../middlewares/authToken');
const userDetailsController = require('../controllers/user/userDetails');
const userLogoutController = require('../controllers/user/userLogout');
const allUsers = require('../controllers/user/allUsers');
const updateUser = require('../controllers/user/updateUser');
const uploadProductController = require('../controllers/product/uploadProduct');
const getProductController = require('../controllers/product/getProduct');
const updateProductController = require('../controllers/product/updateProduct');
const getCategoryProduct = require('../controllers/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controllers/product/getCategoryWiseProduct');
const getProductDetails = require('../controllers/product/getProductDetails');
const addToCartController = require('../controllers/user/addToCartController');
const countAddToCartProduct = require('../controllers/user/countAddToCartProduct');
const addToCartViewProduct = require('../controllers/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controllers/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controllers/user/deleteAddToCartProduct');
const searchProduct = require('../controllers/product/searchProduct');
const filterProductController = require('../controllers/product/filterProduct');
const paymentController = require('../controllers/order/paymentController');
const webhooks = require('../controllers/order/webhook');


const router = express.Router();

router.post('/signup', userSignUpController);
router.post('/signin', userSigninController);
router.get('/user-details', authToken, userDetailsController);
router.get('/user-logout', userLogoutController);

//Admin routes
router.get('/all-users', authToken, allUsers);
router.post('/update-user', authToken, updateUser);


//product routes
router.post('/upload-product', authToken, uploadProductController);
router.get('/get-product', getProductController);
router.post('/update-product', authToken, updateProductController);
router.get('/get-categoryProduct', getCategoryProduct);
router.post('/category-product', getCategoryWiseProduct);
router.post('/product-details', getProductDetails);
router.get('/search', searchProduct);
router.post('/filter-product', filterProductController);

//user Add to Cart
router.post('/addtocart', authToken, addToCartController);
router.get('/countAddToCartProduct', authToken, countAddToCartProduct);
router.get('/view-card-product', authToken, addToCartViewProduct);
router.post('/update-cart-product', authToken, updateAddToCartProduct);
router.post('/delete-cart-product', authToken, deleteAddToCartProduct);

//payment and order
router.post('/checkout', authToken, paymentController);

module.exports = router;