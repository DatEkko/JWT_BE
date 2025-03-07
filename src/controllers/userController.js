const { createUserService, loginService, getUserService } = require("../services/userService");


const createUser = async (req, res) => {
    const data = await createUserService(req.body)
    return res.status(200).json(data)
}

const handleLogin = async (req, res) => {
    const data = await loginService(req.body)
    return res.status(200).json(data)
}

const handleGetUser = async (req, res) => {
    const data = await getUserService()
    return res.status(200).json(data)
}

module.exports = {
    createUser, handleLogin, handleGetUser
}