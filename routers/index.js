const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const reflectionController = require('../controllers/reflectionController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.post('/api/v1/users/register', userController.register);
router.post('/api/v1/users/login', userController.login);
router.use(authentication);
router.get('/api/v1/users', userController.getuser);
router.post('/api/v1/reflections', reflectionController.createReflection);
router.get('/api/v1/reflections', reflectionController.getReflections);
router.get('/api/v1/reflections/:id', reflectionController.getReflectionById);
router.use('/api/v1/reflections/:id', authorization)
router.put('/api/v1/reflections/:id', reflectionController.updateReflection);
router.delete('/api/v1/reflections/:id', reflectionController.deleteReflection);
module.exports = router;