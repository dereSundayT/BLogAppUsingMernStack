const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
//const { check, validationResult } = require('express-validator/check');
const { check, validationResult } = require('express-validator');
//User Model
const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is Required')
      .not()
      .isEmpty(),
    check('email', 'Please a enter a valid Email').isEmail(),
    check(
      'password',
      'Please Enter a password with 6 or more characters'
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    //console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    //pulling out data from req.body
   const {name, email, password} = req.body;
   try {
       //check if User Exist
      // let user = await User.findOne({email:email});
       let user = await User.findOne({email});
       if(user){
        return res.status(400).json({errors: [{msg: 'User Already Exists'}]});
       }
       //Get users Gravatar
       const avatar = gravatar.url(email,{
           s:'200',
           r:'pg',
           d:'mm'
       })
       //create an instance of the user
       user = new User({
           name,
           email,
           avatar,
           password
       })
       //Encrypt password
        //create a salt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        //user.save() gives us a promise, so we need to add await
        await user.save();
       //Return JsonWebToken
       res.send('User Registered');
       
   } catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error');
   }

  }
);

module.exports = router;
