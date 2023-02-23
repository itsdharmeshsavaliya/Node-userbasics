var JWT = require("jsonwebtoken");
var secretKey = process.env.SECRET_KEY

exports.isLoggedIn = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.json({ message: "Access denied", status: 0 });
    try {
        const verified = JWT.verify(token, secretKey);
        req.user = verified.user;
        next();
    } catch (error) {
        let message = (!req.user) ?  "Unauthorized user" : error;
        res.json({ message: message, status: 0 })
    }
}

//admin jwt token generate
exports.isadminLoggedIn = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.json({ message: "Access denied", status: 0 });
    let message = "";
    try {
        const objToken = await JWT.verify(token, secretKey);
        if(objToken) {
            let payload = objToken.payload;        
            if(payload) {
                req.admin = payload;
                next();
            } else {
                message = "Unauthorized user!";
                res.json({ message: message, status: 0 })
            }  
        } else {
            message = "Unauthorized user!";
            res.json({ message: message, status: 0 })
        }        
    } catch (error) {
        message = (!req.admin) ?  "Unauthorized user!" : error;
        res.json({ message: message, status: 0 })
    }
}