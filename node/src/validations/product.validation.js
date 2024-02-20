const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createProduct = {
  body: Joi.object().keys({
    category : Joi.custom(objectId).required(),
    menu : Joi.custom(objectId).required(),
    title : Joi.string(),
    title_po : Joi.string(),
    title_ru : Joi.string(),
    description: Joi.string(),
    description_po: Joi.string(),
    description_ru: Joi.string(),
    inStock: Joi.boolean(),
    status: Joi.number(),
    images : Joi.array(),
    currency: Joi.string(),
    listingPrice: Joi.number(),
    sellingPrice: Joi.number(),
    sellingPriceAr: Joi.number(),
    calorie: Joi.number(),
    discount: Joi.number(),
    modifierGroup: Joi.string(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    restaurant : Joi.string().custom(objectId),
    menu : Joi.string().custom(objectId),
    category : Joi.string().custom(objectId),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    user: Joi.custom(objectId),
    from : Joi.string(),
    to : Joi.string(),
  }),
};

const getProduct = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    category: Joi.string().custom(objectId),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    productId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      menu : Joi.custom(objectId),
      category : Joi.string().custom(objectId),
      title : Joi.string(),
      title_po : Joi.string(),
      title_ru : Joi.string(),
      description: Joi.string(),
      description_po: Joi.string(),
      description_ru: Joi.string(),
      inStock: Joi.boolean(),
      sort: Joi.number(),
      status: Joi.number(),
      images : Joi.array(),
      currency: Joi.string(),
      calorie: Joi.number(),
      listingPrice: Joi.number(),
      sellingPrice: Joi.number(),
      sellingPriceAr: Joi.number(),
      discount: Joi.number(),
      modifierGroup: Joi.string(),
      productList: Joi.string()
    }),
};

const deleteProduct = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
};

const getProductUser = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId),  
  })
}

const updateUserInfo = {

}

const empty = {
  
}
const addToStore = {
  params: Joi.object().keys({
    productId: Joi.string().custom(objectId),
  }),
}

const fileUpload = {
  body: Joi.object()
    .keys({
      userId : Joi.string().custom(objectId),
    })
}
module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductUser,
  updateUserInfo,
  empty,
  fileUpload,
  addToStore
};
