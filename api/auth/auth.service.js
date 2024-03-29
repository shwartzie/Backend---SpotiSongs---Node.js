const Cryptr = require("cryptr");
const bcrypt = require("bcrypt");
const userService = require("../user/user.service");
const logger = require("../../services/logger.service");
const cryptr = new Cryptr(process.env.SECRET);

async function login(username, password) {
    // logger.debug(`auth.service - login with username: ${username}`);

    console.info(`auth.service - login with username: ${username}`);
    const user = await userService.getByUsername(username, password);
    if (!user) return Promise.reject("Invalid username or password");

    // const match = await bcrypt.compare(password, user.password)
    // if (!match) return Promise.reject('Invalid username or password')

    return user;
}

// (async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()

async function signup({ username, password, fullname, imgUrl }) {
    const saltRounds = 10;

    logger.debug(`auth.service - signup with username: ${username}, fullname: ${fullname}`);
    if (!username || !password || !fullname) return Promise.reject("Missing required signup information");

    const userExist = await userService.getByUsername(username);
    if (userExist) return Promise.reject("Username already taken");

    const hash = await bcrypt.hash(password, saltRounds);
    return userService.add({ username, password: hash, fullname, imgUrl });
}

async function logout(req, res) {
    try {
        const user = req.body;
        delete user;
    } catch (err) {
        logger.error("Failed to logout user", err);
        res.status(500).send({ err: "Failed to logout user" });
    }
}

function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify(user));
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken);
        const loggedinUser = JSON.parse(json);
        return loggedinUser;
    } catch (err) {
        console.log("Invalid login token");
    }
    return null;
}

module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken,
    logout,
};
