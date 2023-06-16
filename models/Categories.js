const mongoose = require("mongoose");

//define schema
const UserSchema = new mongoose.Schema(
    {
        categoryname: {
            type: String,
            require: true,
        },
        productquantity: {
            type: String,
            require: true,
        },
        image: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
    },{ timestams: true }
);

//create  collection

const CategoryModel = mongoose.model("categories", UserSchema);

module.exports = CategoryModel;
