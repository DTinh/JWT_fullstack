
import { useState } from 'react';
import './Register.scss'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { handleRegisterService } from '../../services/apiServices'
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const Register = (props) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValiConfirmPassword: true
    }
    const [objectCheckInput, setObjectCheckInput] = useState(defaultValidInput)

    let history = useHistory();
    let handleLogin = () => {
        history.push("/login");
    }
    const handleRegister = async () => {
        let hashPasswordFromReact = await hashUserPassword(password);
        let userData = { email, phone, username, hashPasswordFromReact }
        let check = isValidInput();

        if (check === true) {

            let res = await handleRegisterService(userData);
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                history.push("/login");
            } else {
                toast.error(res.errMessage)
            }
        }
    }
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

    const isValidInput = () => {
        setObjectCheckInput(defaultValidInput);
        if (!email) {
            toast.error('Email is required')
            setObjectCheckInput({ ...defaultValidInput, isValidEmail: false })
            return false;
        }
        let regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!regx.test(email)) {
            setObjectCheckInput({ ...defaultValidInput, isValidEmail: false })
            toast.error('Please enter a valid email address')
            return false;
        }
        if (!username) {
            toast.error('Username is required')
            return false;
        }
        if (!phone) {
            setObjectCheckInput({ ...defaultValidInput, isValidPhone: false })
            toast.error('Phone is required')
            return false;
        }
        if (!password) {
            setObjectCheckInput({ ...defaultValidInput, isValidPassword: false })
            toast.error('Password is required')
            return false;
        }
        if (password != confirmPassword) {
            setObjectCheckInput({ ...defaultValidInput, isValiConfirmPassword: false })
            toast.error('Your password is not same')
            return false;
        }
        return true;

    }
    return (
        <div className="register-container ">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>
                            Register
                        </div>
                        <div className='detail'>
                            Register giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.
                        </div>
                    </div>
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-3">
                        <div className='brand d-sm-none'>
                            Register
                        </div>
                        <div className='form-group'>
                            <label>Email: </label>
                            <input type='text' className={objectCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Email address'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone number: </label>
                            <input type='text' className={objectCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Phone number'
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Username: </label>
                            <input type='text' className='form-control' placeholder='Username'
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password: </label>
                            <input type='password' className={objectCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password: </label>
                            <input type='password' className={objectCheckInput.isValiConfirmPassword ? 'form-control' : 'form-control is-invalid'}
                                placeholder='Re-enter password'
                                value={confirmPassword}
                                onChange={(event) => setconfirmPassword(event.target.value)}
                            />
                        </div>
                        <button className='btn btn-primary'
                            onClick={() => handleRegister()}
                        >Register</button>

                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already've an account. Login</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
