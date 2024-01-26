const mongoose = require('mongoose');

const conn = async (req,res) => {
    (await mongoose.connect('mongodb://localhost:27017/todo')).isObjectIdOrHexString(()=>{
        console.log("Connected");
    });
}
conn();