const express = require("express");
const { getUser, deleteUser, updateUser, logout, getUsers, addUser, generateToken } = require("./user.controller.js");

const router = express.Router();

// middleware that is spec  ific to this router
// router.use(requireAuth)

router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/login/:id", getUser, generateToken);
router.put("/:id", updateUser);
router.post("/", logout);
router.post('/signup', addUser);

// router.put('/:id',  requireAuth, updateUser)
router.delete("/:id", deleteUser);

module.exports = router;
