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
let handleLogin = async (req, res) => {
    try {
        let data = await apiServices.handleUserLogin(req.body);
        //set cookie

        res.cookie('jwt', data.data.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        return res.status(200).json(data);
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server'
        })
    }
}
let getTest = (req, res) => {
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
    res.send('hello');

}
module.exports = {
    handleRegister, handleLogin, getTest
}