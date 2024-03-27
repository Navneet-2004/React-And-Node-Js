const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('./model/category');
const cloudinary = require('cloudinary').v2;
const checkAuth = require('./middleware/check-auth');


cloudinary.config({
    cloud_name:'dkga6vcpy',
    api_key:'337548896194817',
    api_secret:'F9jFfYWM1cI9QT-L9lO-EIBiyuo'
  });



router.get('/',checkAuth,(req,res,next)=>{
    Category.find()
    
    .then(result=>{
       res.status(200).json({
           category:result
       }) 
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

// save category
router.post('/',checkAuth,(req,res,next)=>{
    console.log(req.body);
    console.log(req.files);
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
      console.log(result);
      category = new Category({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        photo:result.url
      });
      category.save()
      .then(result=>{
        console.log(result);
        res.status(200).json({
          new_category:result
        })
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
          error:err
        })
      })
    })
  
  });

  //get single category by id
router.get('/:id',(req,res,next)=>{
  const _id = req.params.id;
  Category.findById(_id)
  
  .then(result=>{
    // console.log(result)
    res.status(200).json({
      category:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
})


  // update
router.put('/:id',(req,res,next)=>{
  console.log(req.params.id);
  const file = req.files.photo;
  console.log(file);
  cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    console.log(result);
    Category.findOneAndUpdate({_id:req.params.id},{
      $set:{
        name:req.body.name,
        photo:result.url
      }
    })
    .then(result=>{
      res.status(200).json({
        updated_category:result
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      })
    })
  })

})

  

// router.delete('/:id',(req,res,next)=>{
  //   console.log(req.params.id);
   //  Category.findByIdAndRemove(req.params.id)
   //  .then(result=>{
    //     res.status(200).json({
     //       message:'category deleted',
     //        result:result
      //   })
    // })
    // .catch(err=>{
      //   console.log(err);
      //   res.status(500).json({
       //      error:err
      //   })
     //})
// })
router.delete('/', (req, res, next) => {
  const imageUrl = req.query.imageUrl;
  const urlArray = imageUrl.split('/');
  console.log(urlArray)
  const image = urlArray[urlArray.length - 1]
  console.log(image)
  const imageName = image.split('.')[0]
  console.log(imageName)
  categoryId = req.query.id;
  Category.deleteOne({ _id: categoryId }) // Use deleteOne or deleteMany depending on your needs
      .then(result => {
          cloudinary.uploader.destroy(imageName,(error,result)=>{
              console.log(error,result);
          })
          res.status(200).json({
              message: result
          })
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error: err
          })
      })
})



module.exports = router;
