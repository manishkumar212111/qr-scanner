const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
  .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
  .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

router
.route('/password')
.post(auth('changePasssword'), validate(userValidation.changePassword), userController.changePassword)

router.get('/users/detail', validate(userValidation.empty), userController.getUserDetails)
router.post('/users/updateExpiry', validate(userValidation.expiry), userController.expiryController)
router.post('/users/email', validate(userValidation.changeEmail), userController.changeEmail)

module.exports = router;
