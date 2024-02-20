const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const User = require('../models/user.model');
const { Restaurant } = require('../models');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'role' , 'block_id' , 'panchayat_id']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.send({ status : true });
});

const changePassword = catchAsync(async (req, res) => {
  console.log(req.user, "sdvdfvdfjnkjn")
  const user = await userService.changePassword(req.user.id, req.body.password , req.body.new_password);
  res.send(user);

});

const changeEmail = catchAsync(async (req, res) => {
  const user = await userService.changeEmail(req.body.userId, req.body.password , req.body.email);
  res.send(user);
});

const getUserDetails = catchAsync(async (req , res) => {
  console.log(req.user)
    const user = await User.findById(req.query.user);
    const restaurant =await Restaurant.findOne({user: req.query.user}).select('status settings logo_url');
    // user.restaurant = restaurant;
    console.log(restaurant)

    res.send({user: user, restaurant : restaurant});
});

const expiryController = catchAsync(async (req , res) => {
    const user = await userService.updateUserById(req.body.userId, {expiry: req.body.expiry});

    res.send({user: user});
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changeEmail,
  changePassword,
  getUserDetails,
  expiryController
};
