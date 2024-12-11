import groupService from '../services/groupService';

let readFunc = async (req, res) => {
    try {
        let data = await groupService.getGroup();
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
    readFunc
}