const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/',[
    body('a_name', 'Enter a valid Name').isLength({min:3}),
    body("f_name" ,'Enter a valid father name').isLength({min:3}),
    body("password","Password must be greater than 8 characters").isLength({min:6}),
    body("phone","Enter a valid phone number").isLength({min:11}),],
    async(req , res)=>{
    
    const errors = validationResult(req);
       if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});   
    }
    // check weather the admin is create from this id
    let admin = await Admin.findOne({ adminid: req.body.adminid });
    console.log(admin);
    if (admin) {
      return res.status(400).json({ error: "Sorry a user with this id is already exists" })
    }
    admin  = await Admin.create({
        adminid:req.body.adminid,
        a_name:req.body.a_name,
        f_name:req.body.f_name,
        password:req.body.password,
        address:req.body.address,
        cnic:req.body.cnic,
        phone:req.body.phone
    })
    
    res.json(admin)
    // .then(admin=>res.json(admin))
    // .catch(err => {console.log(err ,"Th8s siafhnsg",req.body) 
    // res.json({error:"Please Enter a unique ID" , message:err.message})
    // })
})

module.exports = router