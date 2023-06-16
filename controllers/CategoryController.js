const CategoryModel = require('../models/Categories')
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

cloudinary.config({
    cloud_name: 'dohun5xgh',
    api_key: '496119554365172',
    api_secret: 'ybc1bUWsVt93lNvgturdfImj4Ak',
    secure: true
  });

class CategoryController {
    static categoryinsert = async (req, res) => {
      try {
        const file = req.files.image;
        const imagefile = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "Category_image",
        });
        const data = new CategoryModel({
          categoryname: req.body.categoryname,
          productquantity: req.body.productquantity,
          image: {
            public_id: imagefile.public_id,
            url: imagefile.secure_url,
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
  
    static display = async (req, res) => {
      try {
        const result = await CategoryModel.find();
        res.status(201).json({
          status: true,
          result,
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    static view = async (req, res) => {
      try {
        // console.log(req.params.id)
        // res.render('/admin/slider/sliderdview')
        const result = await CategoryModel.findById(req.params.id);
        // console.log(result)
        res.status(201).json({
          status: true,
          result,
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    static categoryupdate = async (req, res) => {
      try {
        // image id deletion
        const data = await CategoryModel.findById(req.params.id);
        const imageid = data.image.public_id;
        //   console.log(imageid)
        await cloudinary.uploader.destroy(imageid);
  
        // image update
        const file = req.files.image;
        const imagefile = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "Category_image",
        });
        const result = await CategoryModel.findByIdAndUpdate(req.params.id, {
          categoryname: req.body.categoryname,
          productquantity: req.body.productquantity,
          image: {
            public_id: imagefile.public_id,
            url: imagefile.secure_url,
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
  
    static delete = async (req, res) => {
      try {
        // console.log(req.params.id)
        const data = await CategoryModel.findById(req.params.id);
        const imageid = data.image.public_id;
        await cloudinary.uploader.destroy(imageid);
        await CategoryModel.findByIdAndDelete(req.params.id);
        res.status(201).json({
          success: true,
          message: "delete successfully",
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

module.exports = CategoryController