
import { where } from 'sequelize';
import db from '../models/index';
import { checkEmailExist, checkPhoneExist, } from './apiServices';
import { reject } from 'lodash';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }

    })
}
let getAllUser = async () => {
    try {
        let data = await db.User.findAll({
            attributes: {
                exclude: ['password']
            },
            include: [
                { model: db.Group, attributes: ['name', 'description'] }
            ],
            raw: true,
            nest: true
        });
        if (data) {
            return {
                errCode: 0,
                errMessage: 'get data success',
                data
            }
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: 1,
            errMessage: 'something wrongs with services',
            data: []
        }
    }
}
let getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: {
                exclude: ['password']
            },
            include: [
                { model: db.Group, attributes: ['name', 'description'] }
            ],
            order: [
                ['id', 'DESC']
            ],
            raw: true,
            nest: true
        })
        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            errCode: 0,
            errMessage: 'fetch ok',
            data
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: 1,
            errMessage: 'something wrongs with services',
            data: []
        }
    }
}
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email and phonenumber
            let hashPassword = await hashUserPassword(data.password);
            let isEmailExist = await checkEmailExist(data.email);
            let isPhoneExist = await checkPhoneExist(data.phone);
            let regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (!regx.test(data.email)) {
                resolve({
                    errCode: 1,
                    errMessage: 'Please enter a valid email address'
                })
            }
            if (data.password && data.password.length < 6) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your password must have more than 6 letters'
                })
            }
            if (!data.password || !data.email || !data.phone) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter'
                })
            }
            if (isEmailExist === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'The email is already exist',
                    data: 'email'
                })

            } else
                if (isPhoneExist === true) {
                    resolve({
                        errCode: 1,
                        errMessage: 'The phone is already exist',
                        data: 'phone'
                    })
                }
                else {
                    await db.User.create({
                        ...data, password: hashPassword
                    });
                    resolve({
                        errCode: 0,
                        errMessage: 'create a new user success!',
                        data: []
                    })
                }
        } catch (e) {
            reject(e)
            resolve({
                errCode: 1,
                errMessage: 'something wrongs with services',
                data: []
            })
        }
    })
}

let updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            //update
            user.save({

            })
        } else {
            //not found
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: 1,
            errMessage: 'something wrongs with services',
            users: []
        }
    }
}
let deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (!user) {
            return {
                errCode: 2,
                errMessage: 'User not exist',
                data: []
            }
        }
        await db.User.destroy({
            where: { id: id }
        })
        return {
            errCode: 0,
            errMessage: 'Delete user success',
            data: []
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: 1,
            errMessage: 'something wrongs with services',
            data: []
        }
    }
}
module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}