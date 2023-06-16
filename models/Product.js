const mongoose = require("mongoose");

//define schema
const UserSchema = new mongoose.Schema(
  {
    productname: {
      type: String,
      require: true,
    },
    pprice: {
      type: String,
      require: true,
    },
    pdescription: {
      type: String,
      require: true,
    },
    pimage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestams: true }
);

//create  collection

const ProductModel = mongoose.model("product", UserSchema);

module.exports = ProductModel;
