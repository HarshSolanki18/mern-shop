var express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const config=require('config');
const jwt=require("jsonwebtoken");
const auth=require('../middleware/auth');

//User Model

const User=require('../../models/User');

//@route POST api/auth
//@desc auth user
//@access public
router.post('/',(req,res)=>{
    const {name,email,password}=req.body;
    

    
    //check if we have exiting user
    User.findOne({email})
    .then(user=>{
        if(!user) return res.status(400).json({msg:'User does not exists'});

        
            //validate password
            bcrypt.compare(password,user.password)
            .then(isMatch=>{
                if(!isMatch) return res.status(400).json({msg:"invalid credentials"});
                jwt.sign(
                    {id:user.id},
                    config.get('jwtSecret'),
                    {expiresIn:3600},
                    (err,token)=>{
                        if(err) throw err;
                        res.json({
                            token,
                            user:{
                                id:user.id,
                                name:user.name
    
                            }
                        })

                    }
                )
            })
        

    })
});
//@route GET api/auth/user
//@desc get user data
//@access private

router.get('/user',auth,(req,res)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user=>res.json(user));
})

module.exports=router;

