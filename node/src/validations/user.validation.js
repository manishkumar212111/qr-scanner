const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    role: Joi.string(),
    mobile: Joi.string(),
    ccode: Joi.string(),
    first_name: Joi.string(),
    last_name: Joi.string(),
    status: Joi.boolean(),
    gender: Joi.string(),
    avatar: Joi.string(),
    planName: Joi.string(),

  }),
};

const getUsers = {
  query: Joi.object().keys({
    role: Joi.string(),
    status: Joi.boolean(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      role: Joi.string(),
      mobile: Joi.string(),
      ccode: Joi.string(),
      first_name: Joi.string(),
      last_name: Joi.string(),
      status: Joi.boolean(),
      gender: Joi.string(),
      avatar: Joi.string(),
      planName: Joi.string(),
      features: Joi.object(),
      firebaseToken: Joi.string()
    }),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const changeEmail = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    userId: Joi.string().custom(objectId),
  }),
};

const changePassword = {
  body: Joi.object().keys({
    new_password:  Joi.string().required().custom(password),
    password: Joi.string().required().custom(password),
  }),
};
const empty = {
  query: Joi.object().keys({
    user: Joi.string().custom(objectId)
  }),
}
const expiry = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId),
    expiry:  Joi.date().required(),
  }),
}
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  changeEmail,
  changePassword,
  empty,
  expiry
};
