import userService from '../services/userService';

let readFunc = async (req, res) => {
    if (req.query.page && req.query.limit) {
        let page = req.query.page;
        let limit = req.query.limit;
        try {
            let data = await userService.getUserWithPagination(+page, +limit);
            return res.status(200).json(data);
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    } else {
        try {
            let data = await userService.getAllUser();
            return res.status(200).json(data);
        } catch (e) {
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the server'
            })
        }
    }

}
let createFunc = async (req, res) => {
    try {
        let data = await userService.createNewUser(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let updateFunc = async (req, res) => {
    try {
        let data = await userService.updateUser(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let deleteFunc = async (req, res) => {
    try {
        let data = await userService.deleteUser(req.body.id);
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getUserAccount = async (req, res) => {
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        data: {
            access_token: req.token,
            groupWithRoles: req.user.groupWithRoles,
            email: req.user.email,
            username: req.user.username
        }
    })
}
module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc, getUserAccount
}