var express=require('express');
const router=express.Router();
var auth=require('../middleware/auth');

//Item Model

const Item=require('../../models/Item');

//@route GET api/items
//@desc GET all items
//@access public
router.get('/',(req,res)=>{
    Item.find()
    .sort({date:-1})    //descending -1
    .then(items=>res.json(items))
})

//@route POST api/items
//@desc Create an  item
//@access public
router.post('/',auth,(req,res)=>{
    const newItem=new Item({
        name:req.body.name
    })
    newItem.save().then(item=>res.json(item))
});
module.exports=router;

//@route delete api/items/:id
//@desc delete an  item
//@access public
router.delete('/:id',auth,(req,res)=>{
    Item.findById(req.params.id)
    .then(item=>item.remove().then(()=>res.json({success:true})))
    .catch(err=>res.status(404).json({success:false}))
});
module.exports=router;