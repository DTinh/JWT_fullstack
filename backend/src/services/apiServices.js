import { where } from "sequelize";
import db from "../models/index";
import { reject } from "lodash";
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import { getGroupWithRoles } from './JWTService';
import { createJWT } from '../middleware/JWTAction';
require('dotenv').config();

let checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false;
}
let checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false;
}
let handleRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isEmailExist = await checkEmailExist(data.email);
            let isPhoneExist = await checkPhoneExist(data.phone);
            if (data.hashPasswordFromReact && data.hashPasswordFromReact.length < 6) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your password must have more than 6 letters'
                })
            }
            if (!data.hashPasswordFromReact || !data.email || !data.phone) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            if (isEmailExist === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'The email is already exist'
                })

            } else

                if (isPhoneExist === true) {
                    resolve({
                        errCode: 1,
                        errMessage: 'The phone is already exist'
                    })
                }
                else {
                    // let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                    await db.User.create({
                        username: data.username,
                        email: data.email,
                        password: data.hashPasswordFromReact,
                        phone: data.phone,
                        address: data.address,
                        groupId: 4
                    })
                    resolve({
                        errCode: 0,
                        errMessage: 'create a new user succeed!'
                    })
                }

        } catch (e) {
            reject(e)
        }
    })
}
let checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}
let handleUserLogin = (rawData) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne({
                where: {
                    [Op.or]: [
                        { email: rawData.valueLogin },
                        { phone: rawData.valueLogin }
                    ]
                }
            })
            // console.log("check js object", user.get({ plain: true }));
            // console.log("check sequelize object", user);
            if (user) {
                let isCorrectPassword = checkPassword(rawData.password, user.password);
                if (isCorrectPassword === true) {

                    //test role
                    let groupWithRoles = await getGroupWithRoles(user);
                    let payload = {
                        email: user.email,
                        groupWithRoles,
                        expiresIn: process.env.JWT_EXPIRES_IN
                    }
                    let token = createJWT(payload);
                    resolve({
                        errCode: 0,
                        errMessage: 'Login succeed!',
                        data: {
                            access_token: token,
                            groupWithRoles
                        }
                    })
                }
            }

            resolve({
                errCode: 1,
                errMessage: 'Your email/phone number or password is incorrect!'
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    handleRegister, handleUserLogin, checkEmailExist, checkPassword, checkPhoneExist
}