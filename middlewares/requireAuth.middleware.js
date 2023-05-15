const authService = require("../api/auth/auth.service");
const logger = require("../services/logger.service");
const jwt = require("jsonwebtoken");
function requireAuth(req, res, next) {
    if (!req?.cookies?.loginToken) {
        return res.status(401).send("Not Authenticated");
    }
    const loggedinUser = authService.validateToken(req.cookies.loginToken);
    if (!loggedinUser) {
        return res.status(401).send("Not Authenticated");
    }
    next();
}

function requireAdmin(req, res, next) {
    if (!req?.cookies?.loginToken) {
        return res.status(401).send("Not Authenticated");
    }
    const loggedinUser = authService.validateToken(req.cookies.loginToken);
    if (!loggedinUser.isAdmin) {
        logger.warn(loggedinUser.fullname + "attempted to perform admin action");
        res.status(403).end("Not Authorized");
        return;
    }
    next();
}

function authenticateToken(request, response, next) {
    // console.log("middleware: authenticateToken",request.headers)
    // console.info("USER", request.user);
    const header = request.headers['authorization'];
    const token = header && header.split(' ')[1];
    console.info("header", header);
    console.info("token", token);
    if (!token) return response.status(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (!error) return response.status(403).json(error);
        console.info("USER", user);
        request.user = user;
        next();
    });
}
// module.exports = requireAuth

module.exports = {
    requireAuth,
    requireAdmin,
    authenticateToken
};
