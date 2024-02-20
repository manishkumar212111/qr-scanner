const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    // mobile: Joi.string().required(),
    // ccode: Joi.string().required(),
    role: Joi.string(),
    planName: Joi.string(),
    acceptTermCondition: Joi.boolean()
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    ccode: Joi.string(),
    mobile: Joi.string(),
    password: Joi.string().required(),
    role: Joi.string()
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};


const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    ccode: Joi.string(),
    mobile: Joi.string(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
    token: Joi.string().required()
  }),
};

const verifyOtp = {
  body: Joi.object().keys({
    otp: Joi.string().required(),
    userId: Joi.string().required()
  }),
};
module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyOtp
};
