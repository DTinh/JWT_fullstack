
import './Login.scss'


const Login = (props) => {
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
                    <div className="content-right col-12 col-sm-5 d-flex flex-column gap-3 py-2">
                        <div className='brand d-sm-none'>
                            Login
                        </div>
                        <input type='text' className='form-control' placeholder='Email address or your phone number' />
                        <input type='text' className='form-control' placeholder='Password' />
                        <button className='btn btn-primary'>Login</button>
                        <span className='text-center'>
                            <a className='forgot-password' href='#'>Forgot your password?</a>
                        </span>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success'>Create new account</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
