
import { where } from 'sequelize';
import db from '../models/index';

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
    try {
        await db.User.create({

        })
    } catch (e) {
        console.log(e);
        return {
            errCode: 1,
            errMessage: 'something wrongs with services',
            users: []
        }
    }
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