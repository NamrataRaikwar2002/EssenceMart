const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, next) => {
    console.log("verifyAuth middleware is running..."); // ✅ Check if this logs

    const token = req.headers.authorization;
    console.log("Received Token:", token, req);
    console.log(process.env.JWT_SECRET, "JWT Secret Key");
    try {
        if (!token) {
            res.status(401).json({
                message: "Unauthorized access! Token is not present!!!"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decoded, 'hereisloghere')
        req.user = {
            userId: decoded.userId
        }
        next()
    } catch (err) {
        return res.status(403).json({
            message: "Unauthorized access! Token error!!!",
            errorMessage: err.message
        });
    }
}

module.exports = {
    verifyAuth
};