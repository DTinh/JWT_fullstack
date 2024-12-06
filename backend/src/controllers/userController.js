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
let createFunc = (req, res) => {
    try {

    } catch (e) {

    }
}
let updateFunc = (req, res) => {
    try {

    } catch (e) {

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

module.exports = {
    readFunc, createFunc, updateFunc, deleteFunc
}