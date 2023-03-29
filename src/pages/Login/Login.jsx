import loginJpg from '../../assets/login.jpg'
import './Login.scss';
const Login = () => {
    return (
        <div className="login-page">
            <img src={loginJpg} alt="Login-image" />
            <div className="login-form">
                <h2>El buen Sabor</h2>
                <h3>Login into your account</h3>
                <p className='welcome-message'>Welcome back, please enter your details</p>
                <div className="inputs-login">
                    <button className="button-google">Google</button>
                    <p className='or'>Or</p>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="input-text"/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="input-text"/>
                    <input type="checkbox" name="remember" id="remember"/><span className='remember-me'>Remember me</span>
                    <span className='forgot-password'>Forgot password?</span>
                    <button className="button-login">Log in</button>
                    <p>Don't have an account? <u>Sign up</u></p>
                </div>
            </div>
        </div>
    )
}

export default Login