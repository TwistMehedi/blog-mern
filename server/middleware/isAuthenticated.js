import jwt from "jsonwebtoken";

const isloggedin  = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success:false, message: "Not logged in" });
        };

        console.log(token)

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
 
         if (!decoded.id) {
            return res.status(400).json({ success: false, message: "Token missing user ID" });
        };

        req.id = decoded.id;
  
        next()
    } catch (error) {
        
    }
};

export default isloggedin;