const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { sendOTP } = require('../services/email.service');
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if(!userBody.acceptTermCondition){
    throw new ApiError(httpStatus.BAD_REQUEST, 'Please accept terms and conditions');

  }
  
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  userBody.status = 0;
  const user = await User.create({ ...userBody });
  return user;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  
  const users = await User.paginate(filter, options);
  return users;
  
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id).exec();
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const checkLogin = async (email, role="user") => {
  return User.findOne({ email, status: true, role:role });
};

const checkLoginByEmail = async (email, role="user") => {
  return User.findOne({ email, status: true, role:role });
};


const checkLoginByMobile = async (mobile, role="user", ccode) => {
  return User.findOne({ mobile, role:role , ccode : ccode });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

/**
 * Change user password
 * @param {ObjectId} password
 * @returns {Promise<User>}
 */
 const changePassword = async (userId , password , new_password) => {
  const user = await getUserById(userId);
  console.log(userId)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect current password');
  }
  await updateUserById(user.id, { password: new_password });
  return user;
};

/**
 * Change user password
 * @param {ObjectId} password
 * @returns {Promise<User>}
 */
 const changeEmail = async (userId , password , email) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect current password');
  }
  await updateUserById(user.id, { email: email });
  user.email = email;
  return user;
};

const getUserDetails = async (email) => {
  let user = await User.find({email : email}).select('style');
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user?user[0]:[];
}
module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  checkLogin,
  changePassword,
  changeEmail,
  getUserDetails,
  getUserByEmail,
  checkLoginByEmail,
  checkLoginByMobile
};
