const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");


router.post("/addTask",async (req,res)=>{
    try{
        const {title,body,email} = req.body;
        const existingUser =await User.findOne({email});
        if(existingUser){
            const newList = new List({
                title,
                body, 
                user: existingUser
            });
            await newList.save().then(() => res.status(200).json(newList));
            existingUser.list.push(newList);
            existingUser.save();

        }
    }
    catch(error){

    }
});



router.put("/updateTask/:id",async (req,res)=>{
    try{
        const {title,body,email} = req.body;
        const existingUser =await User.findOne({email});
        if(existingUser){
            await List.findByIdAndUpdate(req.params.id,{title,body});
            List.save().then(() => res.status(200).json({message:"Task Updated"}));
        };
    }
    catch(error){
        console.log(error);
    }
});


router.delete("/deleteTask/:id",async (req,res)=>{
    try{
        const {email} = req.body;
        const existingUser =await User.findOneAndUpdate(
            {email},
            {$pull:{list:req.params.id}},
            { new: true }
            );
        if(existingUser){
            await List.findByIdAndDelete(req.params.id).then(() => res.status(200).json({message:"Task Deleted"}));
        };
    }
    catch(error){
        console.log(error);
    }
});


router.get("/getTask/:id",async (req,res)=>{
    try{
        const existingTasks =await List.find({user:req.params.id}).sort({createdAt: -1});
        if(existingTasks.length > 0){
            res.status(200).json({list:existingTasks});
        }
        else{
            res.status(200).json({message:"No tasks"});
        };
    }
    catch(error){
        console.log(error);
    }
});

module.exports = router;