const mongoose = require("mongoose");

const { toJSON, paginate } = require("./plugins");

const ModifiersDetail = new mongoose.Schema({
  name: {
    type: String,
  },
  name_po: {
    type: String,
  },
  name_ru: {
    type: String,
  },
  price: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const modifierSchema = mongoose.Schema(
  {
    restaurant: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: {
      type: String,
    },
    name_po: {
      type: String,
    },
    name_ru: {
      type: String,
    },
    menu: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Menu",
    },
    min: {
      type: Number,
      default: 1,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: 1,
    },
    modifiers: [
      {
        type: ModifiersDetail,
      },
    ],

    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
modifierSchema.plugin(toJSON);
modifierSchema.plugin(paginate);

const Modifier = mongoose.model("Modifier", modifierSchema);

module.exports = Modifier;
