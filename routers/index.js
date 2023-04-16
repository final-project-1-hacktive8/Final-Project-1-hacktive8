const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
// const authorization = require('../middlewares/authorization');
//const ReflectionController = require('../controllers/reflectionController');

router.post('/api/v1/users/register', userController.register);
router.post('/api/v1/users/login', userController.login);
router.use(authentication);
router.get('/api/v1/users', userController.getuser);
// router.post('/api/v1/reflections', ReflectionController.CreateReflection);
// router.get('/api/v1/reflections', ReflectionController.GetAllReflectionsbyId);
// router.put('/api/v1/reflections/:id',ReflectionController.UpdateReflection);
// router.delete('/api/v1/reflections/:id,',ReflectionController.DeleteReflection);
 
module.exports = router;