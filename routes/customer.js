const express = require("express");
const Customer = require("../models/Customer");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const CustomerCounter = require("../models/CustomerCounter");
const fetchuser = require("../middleware/fetchuser");

// router no 1 we add a customer according to sale
router.post(
  "/createinvocie",
  [
    body("cus_name", "Customer name is not valid").isLength({ min: 3 }),
    // body("pro_quantity", "Product is not valid").isLength({ min: 1 }),
    // body("a_recived", "Ammount recived is not valid").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      CustomerCounter.findOneAndUpdate(
        { id: "autoval" },
        { $inc: { seq: 1 } },
        { new: true },
        async (err, cd) => {
          // console.log("this is a counter value", cd);
          let seqId;
          if (cd == null) {
            const newval = new CustomerCounter({ id: "autoval", seq: 1 });
            newval.save();
            seqId = 1;
          } else {
            seqId = cd.seq;
          }

          let customer = await Customer.create({
            // adminid: req.body.adminid,
            c_Id: seqId,
            cus_name: req.body.cus_name,
            products:req.body.products,
            totalquant: req.body.totalquant,
            subtotal:req.body.subtotal,
            finalpay:req.body.finalpay,
            ammountpay:req.body.ammountpay,
            balanceammount: req.body.balanceammount,
            totalsale: req.body.totalsale,
            totalexsale: req.body.totalexsale,
            returnammount:req.body.returnammount
          });
            // console.log(req.body.products)
          const saveInvoice = await customer.save();
          res.json(saveInvoice);
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Router No 2 we get all customer with the help of this
router.get("/getcusinvoice", async (req, res) => {
  const customer = await Customer.find();
  res.json(customer);
});

//Route no 3 this route update the product
router.put(
  "/updateinvocie/:id",
  fetchuser,
  [
    body("cus_name", "Customer name is not valid").isLength({ min: 3 }),
    body("pro_quantity", "Product is not valid").isLength({ min: 1 }),
    body("a_recived", "Ammount recived is not valid").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const { cus_name, pro_quantity, a_recived, discount, p_name } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newInvoice = {};
      if (cus_name) {
        newInvoice.cus_name = cus_name;
      }
      if (pro_quantity) {
        newInvoice.pro_quantity = pro_quantity;
      }
      if (a_recived) {
        newInvoice.a_recived = a_recived;
      }
      if (p_name) {
        newInvoice.p_name = p_name;
      }
      if (discount) {
        newInvoice.discount = discount;
      }

      let updateInvoice = await Customer.findById(req.params.id);
      if (!updateInvoice) {
        console.log(updateInvoice);
        return res.status(404).send("Not Found");
      }
      updateInvoice = await Customer.findByIdAndUpdate(
        req.params.id,
        { $set: newInvoice },
        { new: true }
      );

      res.json({ updateInvoice });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// Router no 4 here we delete the invoice
router.delete("/deleteinvoice/:id", async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let deleteInvoice = await Customer.findById(req.params.id);
    if (!deleteInvoice) {
      return res.status(404).send("Not Found");
    }
    deleteInvoice = await Customer.findByIdAndDelete(req.params.id);
    res.json({
      Success: "Invoice has been deleted",
      addProduct: deleteInvoice,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
