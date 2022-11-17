const express = require("express");
const Admin = require("../models/Admin");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "waleedisagoodbo#y";
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const AdminCounter = require("../models/AdminCounter");

router.post(
  "/createadmin",
  [
    body("a_name", "Enter a valid Name").isLength({ min: 3 }),
    body("f_name", "Enter a valid father name").isLength({ min: 3 }),
    body("password", "Password must be greater than 8 characters").isLength({
      min: 6,
    }),
    body("phone", "Enter a valid phone number").isLength({ min: 11 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check weather the admin is create from this id
    try {
      // let admin = await Admin.findOne({ adminid: req.body.adminid });
      // if (admin) {
      //     return res.status(400).json({ error: "Sorry a user with this id is already exists" })
      // }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      AdminCounter.findOneAndUpdate(
        { id: "autoval" },
        { $inc: { seq: 1 } },
        { new: true },
        async (err, cd) => {
          // console.log("this is a counter value", cd);
          let seqId;
          if (cd == null) {
            const newval = new AdminCounter({ id: "autoval", seq: 1 });
            newval.save();
            seqId = 1;
          } else {
            seqId = cd.seq;
          }

          let admin = await Admin.create({
            // adminid: req.body.adminid,
            adminid: seqId,
            a_name: req.body.a_name,
            f_name: req.body.f_name,
            password: secPass,
            address: req.body.address,
            cnic: req.body.cnic,
            phone: req.body.phone,
          });
          const data = {
            admin: {
              id: admin.id,
            },
          };

          const authtoken = jwt.sign(data, JWT_SECRET);
          res.json({ authtoken });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("adminid", "Enter a valid ID").exists(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { adminid, password } = req.body;
    try {
      let admin = await Admin.findOne({ adminid });
      if (!admin) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, admin.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      const data = {
        admin: {
          id: admin.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post("/getadmin", fetchuser, async (req, res) => {
  try {
    const adminId = req.admin.id;
    const admin = await Admin.findById(adminId).select("-password");
    if (admin == null) {
      res.send("Admin does not exisix");
    } else {
      res.send(admin);
    }
    console.log(admin);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;