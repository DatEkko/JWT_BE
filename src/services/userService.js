require("dotenv").config();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const createUserService = async (data) => {
    try {
        //hash password

        let isExistEmail = await User.findOne({ email: data.email });

        if (isExistEmail) {
            return ({
                EM: "Email has already use!!!",
                EC: 1
            })
        }

        const hashPassword = await bcrypt.hash(data.password, saltRounds)

        let result = await User.create({
            name: data.name,
            email: data.email,
            password: hashPassword,
            role: "ADMIN"
        })

        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}

const loginService = async (data) => {
    try {
        //fetch user by email
        const user = await User.findOne({ email: data.email });
        if (user) {
            //compare password
            const isMatchPassword = await bcrypt.compare(data.password, user.password);
            if (!isMatchPassword) {
                return {
                    EC: -2,
                    EM: "Email/Password không hợp lệ"
                }
            } else {
                //create access token
                const payload = {
                    email: user.email,
                    name: user.name
                }
                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_KEY,
                    {
                        expiresIn: process.env.JWT_EXPIRED
                    }
                )
                return {
                    EC: 0,
                    access_token,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                }
            }

        } else {
            return {
                EC: -1,
                EM: "Email/Password không hợp lệ"
            }
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}

const getUserService = async () => {
    try {
        const user = await User.find({}, '-password');
        if (user) {
            return {
                EC: 0,
                data: user
            }

        } else {
            return {
                EC: -1,
                EM: "No data"
            }
        }

    } catch (error) {
        console.log(error);
        return null;
    }
}


module.exports = {
    createUserService, loginService, getUserService
}