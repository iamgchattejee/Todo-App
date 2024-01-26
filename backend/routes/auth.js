const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");


router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const existingUser = await User.findOne({ email });
        const hashpassword = bcrypt.hashSync(password);
        if (existingUser) {
            res.status(200).json({ message: "User already registered" });
        }
        else {
            const newUser = new User({
                email,
                username,
                password: hashpassword
            });
            await newUser.save()
            res.status(200).json({ message: "Sign Up Sucessful" });
        }
    }
    catch (error) {
        res.status(200).json({ message: "Sign Up Error" });
    }

});

router.post("/signin", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await User.findOne({ email });
        const checkPassword = bcrypt.compareSync(password, user.password);
        if (!user) {
            res.status(200).json({ message: "Please Signup First" });
        }
        else if (!checkPassword) {
            res.status(200).json({ message: "Password doesn't match" });

        }
        else{
            const { password, ...others } = user._doc;
            res.status(200).json({ others,message: "User Signed In" });
        }
    } catch (error) {
        res.status(200).json({ message: "Sign In Error" });
    }
});

module.exports = router;
