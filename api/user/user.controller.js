const userService = require("./user.service");
const socketService = require("../../services/socket.service");
const logger = require("../../services/logger.service");

// const logger = require('../../services/logger.service')

module.exports = {
    getUser,
    deleteUser,
    updateUser,
    logout,
    getUsers,
    addUser
};

async function getUser(request, response) {
    try {
        const user = await userService.getById(request.params.id);
        response.send(user).status(200);
    } catch (error) {
        logger.error("Failed to get user", error);
        response.status(500).send({ error: "Failed to get user" });
    }
}

async function addUser(request, response) {
    try {
        console.info("Adding user")
        const user = await userService.add(request.params.id);
        response.send(user).status(200);
    } catch (error) {
        logger.error("Failed to signup user", error);
        response.status(500).send({ error: "Failed to signup user" });
    }
}

async function getUsers(request, response) {
    try {
        const user = await userService.query("users");
        response.status(200).send(user);
    } catch (error) {
        logger.error("Failed to get user", error);
        response.status(500).send({ error: "Failed to get user" });
    }
}

async function deleteUser(request, response) {
    try {
        await userService.remove(request.params.id);
        response.send({ msg: "Deleted successfully" });
    } catch (error) {
        // logger.error('Failed to delete user', error)
        response.status(500).send({ error: "Failed to delete user" });
    }
}

async function updateUser(request, response) {
    try {
        const user = request.body;
        const savedUser = await userService.update(user);
        response.send(savedUser);
    } catch (error) {
        // logger.error('Failed to update user', error)
        response.status(500).send({ error: "Failed to update user" });
    }
}

async function logout(request, response) {
    try {
        const user = request.body;

        delete user;
    } catch (error) {
        // logger.error('Failed to logout user', error)
        response.status(500).send({ error: "Failed to logout user" });
    }
}
