
import './Login.scss'
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/apiServices';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const Login = (props) => {
    let history = useHistory();
    let handleCreateNewAccount = () => {
        history.push("/register");
    }
    let [valueLogin, setValueLogin] = useState('');
    let [password, setPassword] = useState('');

    let defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true
    }
    let [objValiInput, setObjValiInput] = useState(defaultObjValidInput)
    let handleLogin = async () => {
        setObjValiInput(defaultObjValidInput);
        if (!valueLogin) {
            setObjValiInput({ ...defaultObjValidInput, isValidValueLogin: false })
            toast.error('Please enter your email address or phone number')
            return;
        }
        if (!password) {
            setObjValiInput({ ...defaultObjValidInput, isValidPassword: false })
            toast.error('Please enter your password')
            return;
        }
        let res = await loginUser(valueLogin, password)
        if (res && res.errCode === 0) {
            toast.success(res.errMessage)
            let data = {
                isAuthenticated: true,
                token: 'fake token'
            }
            sessionStorage.setItem("account", JSON.stringify(data));

            history.push("/users");
            window.location.reload();
        } else {
            toast.error(res.errMessage)
        }
    }
    let handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleLogin();
        }
    }
    useEffect(() => {
        let session = sessionStorage.getItem('account')
        if (session) {
            history.push("/");
            window.location.reload();
        }
    }, [])
    return (
        <div className="login-container ">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>
                            Login
                        </div>
                        <div className='detail'>
                            Login giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <div className='brand d-sm-none'>
                            Login
                        </div>
                        <input type='text' className={objValiInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Email address or your phone number'
                            value={valueLogin}
                            onChange={(event) => { setValueLogin(event.target.value) }}
                        />
                        <input type='password' className={objValiInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                            placeholder='Password'
                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            onKeyPress={(event) => handlePressEnter(event)}
                        />
                        <button className='btn btn-primary'
                            onClick={() => handleLogin()}
                        >Login</button>
                        <span className='text-center'>
                            <a className='forgot-password' href='#'>Forgot your password?</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>
                                Create new account</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
