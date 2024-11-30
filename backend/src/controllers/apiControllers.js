import apiServices from '../services/apiServices'

let handleRegister = async (req, res) => {
    try {
        let infor = await apiServices.handleRegister(req.body);
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
    handleRegister
}