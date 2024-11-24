import homeService from '../services/homeService'

let getAllUser = async (req, res) => {
    try {
        let infor = await homeService.getAllUser();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}

module.exports = {
    getAllUser
}