const express = require("express");
const AddProduct = require("../models/AddProduct");
const router = express.Router();
const { body, validationResult } = require("express-validator");
// const bcrypt = require('bcryptjs');
// const JWT_SECRET = "waleedisagoodbo#y"
// var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const ProductCounter = require("../models/ProductCounter");

// Router 1 we get ALL  product
router.get("/getproduct", async (req, res) => {
  const product = await AddProduct.find();
  res.json(product);
});

// Router 2 we add a product
router.post(
  "/addproduct",fetchuser,
  [
    body("p_name", "Enter a valid product name").isLength({ min: 3 }),
    body("p_category", "Enter a valid category name").isLength({ min: 3 }),
    body("p_company", "Enter a valid company name").isLength({ min: 6 }),
    body("p_quantity", "Enter a valid quantity").isLength({ min: 1 }),
    body("p_price", "Enter a valid price").isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      ProductCounter.findOneAndUpdate(
        { id: "autoval" },
        { $inc: { seq: 1 } },
        { new: true },
        async (err, cd) => {
          let seqId;
          if (cd == null) {
            const newval = new ProductCounter({ id: "autoval", seq: 1 });
            newval.save();
            seqId = 1;
          } else {
            seqId = cd.seq;
          }
          const {
            p_name,
            p_category,
            p_price,
            p_company,
            P_sale,
            p_exsale,
            p_quantity,
          } = req.body;
          const addproduct = new AddProduct({
            p_Id: seqId,
            p_name,
            p_category,
            p_price,
            p_company,
            P_sale,
            p_exsale,
            p_quantity,
          });

          const saveProduct = await addproduct.save();
          res.json(saveProduct);
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Update an existing Note using: PUT "/api/product/updateproduct". Login required
router.put("/updateproduct/:p_Id",fetchuser, [
    body("p_name", "Enter a valid product name").isLength({ min: 3 }),
    body("p_category", "Enter a valid category name").isLength({ min: 3 }),
    body("p_company", "Enter a valid company name").isLength({ min: 5 }),
    body("p_quantity", "Enter a valid quantity").isLength({ min: 1 }),
    body("p_price", "Enter a valid price").isLength({ min: 1 }),
  ], async (req, res) => {
  const {
    p_name,
    p_category,
    p_price,
    p_company,
    P_sale,
    p_exsale,
    p_quantity,
  } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Create a newNote object
    const newProduct = {};
    if (p_name) {
      newProduct.p_name = p_name;
    }
    if (p_category) {
      newProduct.p_category = p_category;
    }
    if (p_price) {
      newProduct.p_price = p_price;
    }
    if (p_company) {
      newProduct.p_company = p_company;
    }
    if (P_sale) {
      newProduct.P_sale = P_sale;
    }
    if (p_exsale) {
      newProduct.p_exsale = p_exsale;
    }
    if (p_quantity) {
      newProduct.p_quantity = p_quantity;
    }

    // Find the product to be updated and update it
    // let addProduct = await AddProduct.findOne(req.params.p_Id);//if we want to update our prdouct according to p_Id we can use this 
    // let addProduct = await AddProduct.findById(req.params.id);
    let addProduct = await AddProduct.findOne({ p_Id: req.params.p_Id });
    if (!addProduct) {
      console.log(addProduct);
      return res.status(404).send("Not Found");
    }
  // if we we want to check the admin is upadted their on exting product or not
    // if (addProduct.admin.toString() !== req.admin.id) {
    //   return res.status(401).send("Not Allowed");
    // }
    addProduct = await AddProduct.findOneAndUpdate(
      // req.params.p_Id,// if we want to update our prdouct according to p_Id we can use this 
      // req.params.id,
      { p_Id: req.params.p_Id },
      { $set: newProduct },
      { new: true },
    );
  
    res.json({ addProduct });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing Note using: DELETE "/api/product/deleteproduct". Login required
router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let addProduct = await AddProduct.findById(req.params.id);
        if (!addProduct) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        // if (note.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed");
        // }

        addProduct = await AddProduct.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", addProduct: addProduct });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route:5 find a product through by product id. login required
// router.get('/getproduct/:id',fetchuser, async(req , res)=>{
//   try {
//     let getProduct = await AddProduct.findById(req.params_id)
//     console.log(getProduct);
//     if(!getProduct){
//       return res.status(404).send("Not Found");
//     }
//     else{
//       return res.json(getProduct)
//     }
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
    
//   }
// })

router.get("/getproduct/:p_Id", async (req, res) => {
  try {
    const addProduct = await AddProduct.findOne({p_Id:req.params.p_Id})
    if (!addProduct) {
     return res.status(404).send("Not Found") 
    }
    else{
      res.json(addProduct);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;