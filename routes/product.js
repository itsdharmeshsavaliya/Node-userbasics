var express = require('express');
var router = express.Router();
var { isLoggedIn } = require("../utility/authToken");

const {
    createRoute,
    updateRoute,
    fetchRoute,
    deleteRoute,
    fetchByUserIdRoute
  } = require("../controller/productController");

router.post('/create', isLoggedIn, createRoute);  
router.post('/update', isLoggedIn, updateRoute);
router.post('/fetch', isLoggedIn, fetchRoute);
router.post('/delete', isLoggedIn, deleteRoute);
router.post('/fetchByUserId', isLoggedIn, fetchByUserIdRoute);

module.exports = router;
  