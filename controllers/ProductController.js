const ProductModel = require("../models/Product");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

cloudinary.config({
    cloud_name: 'dohun5xgh',
    api_key: '496119554365172',
    api_secret: 'ybc1bUWsVt93lNvgturdfImj4Ak',
    secure: true
  });

class ProductController {
  static productinsert = async (req, res) => {
    try {
      const file = req.files.pimage;
      const pimagefile = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "Product_pimage",
      });
      const data = new ProductModel({
        productname: req.body.productname,
        pprice: req.body.pprice,
        pdescription: req.body.pdescription,
        pimage: {
          public_id: pimagefile.public_id,
          url: pimagefile.secure_url,
        },
      });
      await data.save();
      res.status(201).json({
        status: true,
        data,
      });
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  static pdisplay = async (req, res) => {
    try {
      const result = await ProductModel.find();
      res.status(201).json({
        status: true,
        result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static pview = async (req, res) => {
    try {
      // console.log(req.params.id)
      // res.render('/admin/slider/sliderdview')
      const result = await ProductModel.findById(req.params.id);
      // console.log(result)
      res.status(201).json({
        status: true,
        result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static productupdate = async (req, res) => {
    try {
      // pimage id deletion
      const data = await ProductModel.findById(req.params.id);
      const pimageid = data.pimage.public_id;
      //   console.log(pimageid)
      await cloudinary.uploader.destroy(pimageid);

      // pimage update
      const file = req.files.pimage;
      const pimagefile = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "Product_pimage",
      });
      const result = await ProductModel.findByIdAndUpdate(req.params.id, {
        productname: req.body.productname,
        pprice: req.body.pprice,
        pdescription: req.body.pdescription,
        pimage: {
          public_id: pimagefile.public_id,
          url: pimagefile.secure_url,
        },
      });
      await result.save();
      res.status(201).json({
        success: true,
        result,
        message: "update successful",
      });
    } catch (error) {
      console.log(error);
    }
  };

  static pdelete = async (req, res) => {
    try {
      // console.log(req.params.id)
      const data = await ProductModel.findById(req.params.id);
      const pimageid = data.pimage.public_id;
      await cloudinary.uploader.destroy(pimageid);
      await ProductModel.findByIdAndDelete(req.params.id);
      res.status(201).json({
        success: true,
        message: "delete successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = ProductController;
