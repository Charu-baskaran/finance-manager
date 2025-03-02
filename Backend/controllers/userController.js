// import User from "../models/UserSchema.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const SignupUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

//         let user = await User.findOne({ email });
//         if (user) return res.status(409).json({ message: "User already exists" });

//         const hashedPassword = await bcrypt.hash(password, 10);
//         user = await User.create({ name, email, password: hashedPassword });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//         res.status(201).json({ user, token });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// export const LoginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid credentials" });

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//         res.json({ user, token });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
// import User from "../models/UserSchema.js";
// import bcrypt from "bcryptjs";

// export const SignupUser = async (req, res, next) => {
//     try{
//         const {name, email, password} = req.body;

//         // console.log(name, email, password);

//         if(!name || !email || !password){
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter All Fields",
//             }) 
//         }

//         let user = await User.findOne({email});

//         if(user){
//             return res.status(409).json({
//                 success: false,
//                 message: "User already Exists",
//             });
//         }

//         //preparing encrypted for storing db
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // console.log(hashedPassword);
//         let newUser = await User.create({
//             name, 
//             email, 
//             password: hashedPassword, 
//         });

//         return res.status(200).json({
//             success: true,
//             message: "User Created Successfully",
//             user: newUser
//         });
//     }
//     catch(err){
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         });
//     }

// }
// export const LoginUser = async (req, res, next) => {
//     try{
//         const { email, password } = req.body;

//         // console.log(email, password);
  
//         if (!email || !password){
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter All Fields",
//             }); 
//         }
    
//         const user = await User.findOne({ email });
    
//         if (!user){
//             return res.status(401).json({
//                 success: false,
//                 message: "User not found",
//             }); 
//         }
    
//         const isMatch = await bcrypt.compare(password, user.password);
    
//         if (!isMatch){
//             return res.status(401).json({
//                 success: false,
//                 message: "Incorrect Email or Password",
//             }); 
//         }

//         delete user.password;

//         return res.status(200).json({
//             success: true,
//             message: `Welcome back, ${user.name}`,
//             user,
//         });

//     }
//     catch(err){
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         });
//     }
// }


// export const allUsers = async (req, res, next) => {
//     try{
//         const user = await User.find({_id: {$ne: req.params.id}}).select([
//             "email",
//             "username",
//             "avatarImage",
//             "_id",
//         ]);

//         return res.json(user);
//     }
//     catch(err){
//         next(err);
//     }
// }
// import User from "../models/UserSchema.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const signupUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         if (!name || !email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter all fields",
//             });
//         }

//         let user = await User.findOne({ email });

//         if (user) {
//             return res.status(409).json({
//                 success: false,
//                 message: "User already exists",
//             });
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Create user
//         let newUser = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//         });

//         return res.status(201).json({
//             success: true,
//             message: "User Created Successfully",
//             user: newUser,
//         });
//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         });
//     }
// };

// export const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter all fields",
//             });
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Incorrect Email or Password",
//             });
//         }

//         // Convert Mongoose object to plain JSON and remove password
//         const userData = user.toObject();
//         delete userData.password;

//         // Generate JWT token
//         // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//         //     expiresIn: "7d",
//         // });

//         return res.status(200).json({
//             success: true,
//             message: `Welcome back, ${user.name}`,
//             user: userData,
//             token, // Return JWT token
//         });

//     } catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         });
//     }
// };
import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";

export const SignupUser = async (req, res,) => {
    try{
        const {name, email, password} = req.body;

         console.log(name, email, password);

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }) 
        }

        let user = await User.findOne({email});

        if(user){
            return res.status(409).json({
                success: false,
                message: "User already Exists",
            });
        }

        //preparing encrypted for storing db
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log(hashedPassword);
        let newUser = await User.create({
            name, 
            email, 
            password: hashedPassword, 
        });

        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            user: newUser
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }

}
export const LoginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        console.log(email, password);
  
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }); 
        }
    
        const user = await User.findOne({ email });
    
        if (!user){
            return res.status(401).json({
                success: false,
                message: "User not found",
            }); 
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch){
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password",
            }); 
        }

        delete user.password;

        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}`,
            user,
        });

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}
