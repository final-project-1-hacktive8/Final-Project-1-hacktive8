const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
// const authorization = require('../middlewares/authorization');

router.post('/api/v1/users/register', userController.register);
router.post('/api/v1/users/login', userController.login);
router.use(authentication);
router.get('/api/v1/users', userController.getuser);
 
module.exports = router;