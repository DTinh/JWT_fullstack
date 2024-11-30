import { where } from "sequelize";
import db from "../models/index";


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
                        address: data.address
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
module.exports = {
    handleRegister
}