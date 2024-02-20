const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const orderSchema = mongoose.Schema(
  {
    restaurant: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Restaurant',
      required: true,  
    },
    products: {
      type: Object,
      default: {}
    },
    // "Pending"
    // "Preparing"
    // "Serving"
    // "Complete" 
    // "Cancelled" 

    status : {
        type : String,
        default : "Pending"
    },
    clientId: {
      type: String
    },
    orderNo:{
      type: Number,
      required: true
    },
    subTotalAmount: {
      type: Number
    },
    tax : {
      type : Number
    },
    totalAmount: {
        type : Number
    },
    orderType: {
      type : String,
      default: ""

    },
    checkoutId:{
      type: String
    },
    active: {
      type: Number,
      default: 1
    },
    tableNo: {
      type : String,
      default: ""
    },
    orderNote: {
      type : String,
      default: ""
    },
    paymentType: {
      type: String,
      default: "online"
    },
    paymentStatus: {
      type : String,
      default: "pending"
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);


// /**
//  * Check if email is taken
//  * @param {string} email - The order's email
//  * @param {ObjectId} [excludeUserId] - The id of the order to be excluded
//  * @returns {Promise<boolean>}
//  */
//  orderSchema.statics.isNameTaken = async function (name, excludeUserId) {
//     const order = await this.findOne({ name, _id: { $ne: excludeUserId } });
//     return !!order;
//   };

  
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
