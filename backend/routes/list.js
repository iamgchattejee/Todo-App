const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
const mongoose = require('mongoose');

router.post("/addTask",async (req,res)=>{
    try{
        const {title,body,id} = req.body;
        const existingUser =await User.findById(id);
        if(existingUser){
            const newList = new List({
                title:title,
                body:body, 
                user: existingUser
            });
            await newList.save().then(() => res.status(200).json(newList));
            console.log(newList);
            existingUser.list.push(newList);
            existingUser.save();

        }
    }
    catch(error){
        console.log(error);
        res.status(200).json({error: error});
        res.status(200).json({message:"Server Error"});
    }
});



router.put("/updateTask/:id",async (req,res)=>{
    try{
        const {title,body} = req.body;
        await List.findByIdAndUpdate(req.params.id,{title,body});
        List.save().then(() => res.status(200).json({message:"Task Updated"}));
       
    }
    catch(error){
        res.status(200).json({message:"Server Error"});
    }
});


router.delete("/deleteTask/:id",async (req,res)=>{
    try{
        const {id} = req.body;
        const existingUser =await User.findByIdAndUpdate(
            id,
            {$pull:{list:req.params.id}},
            { new: true }
            );
        if(existingUser){
            await List.findByIdAndDelete(req.params.id).then(() => res.status(200).json({message:"Task Deleted"}));
        };
    }
    catch(error){
        res.status(200).json({message:"Server Error"});
    }
});


router.get("/getTask/:id",async (req,res)=>{
    try{
        const existingTasks =await List.find({user:req.params.id}).sort({createdAt: -1});
        if(existingTasks.length > 0){
            res.status(200).json({list:existingTasks});
        }
        else{
            res.status(200).json({list:[]});
        };
    }
    catch(error){
        res.status(200).json({message:"Server Error"});
    }
});

module.exports = router;