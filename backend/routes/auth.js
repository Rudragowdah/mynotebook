const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth". Doesn't require Auth.

router.post('/',[
    body('name','Please enter a valid name').isLength({ min: 3 }),
    body('email').isEmail().withMessage('Not a valid e-mail address'),
    body('password','Choose a strong password').isLength({ min: 8 }),
], (req,res)=>{
    console.log(req.body);
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // res.send({ errors: result.array() });      
        return res.status(400).json({ result : result.array()});
    }
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }).then(user => res.json(user))
    .catch(err => {console.log(err);res.json({error:"Please enter a valid email",message:err.message})})
  
})

// router.get('/',(res,req)=>{
//     console.log('Hello World!');
//     res.send('Hello World');
// })

module.exports = router;