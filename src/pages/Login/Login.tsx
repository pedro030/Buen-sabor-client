import google_brand from '../../assets/google_brand.svg'
import './Login.scss';
import { sign_in } from '../../state/actions/userSessionAction';
import { Field, Form, Formik } from 'formik';

const Login = () => {
    return (
        <div className="grid grid-cols-[1fr_700px]">
            <div className="hero h-full bg-[url('src/assets/RegisterImg.png')]">
                <div className="bg-opacity-70 hero-overlay"></div>
            </div>

            <div className="flex flex-col items-center justify-center p-6">
                <h1 className="text-3xl font-bold text-red-600">Buen Sabor</h1>
                <h1 className="my-2 font-bold">Log in to your account</h1>
                <p className="stat-title">Welcome back, please enter your details.</p>
                <button className="w-[400px] mt-3  bg-white btn rounded-xl shadow "><img src={google_brand} alt="Google" /></button>

                <div className='grid w-[400px] grid-cols-[1fr_70px_1fr] mt-8 mb-5'>
                    <hr className='mt-3' />
                    <div className='flex justify-center text-gray-400'>OR</div>
                    <hr className='mt-3' />
                </div>

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        rememberMe: false
                    }}
                    onSubmit={(state) => { console.log(state.email) }}
                >
                    <Form className='form-control w-[400px] items-center'>
                        <div>
                            <label htmlFor='email' className="label">
                                <span className="label-text">Full name</span>
                            </label>
                            <Field name="email" type="email" className="w-[400px] input input-bordered" />
                        </div>

                        <div>
                            <label htmlFor='password' className="label">
                                <span className="label-text">Full name</span>
                            </label>
                            <Field name="password" type="email" className="w-[400px] input input-bordered" />
                        </div>

                        <div className='flex flex-row items-center justify-between w-full mt-5'>
                            <div className='flex flex-row items-center'>
                                <Field type="checkbox" name="rememberMe" className="mr-3 checkbox checkbox-primary checkbox-sm " />
                                <label className='remember-me'>Remember me</label>
                            </div>
                            <p>Forgot password?</p>
                        </div>
                        <button
                            type="submit"
                            className="w-full my-5 rounded-full btn btn-primary"
                        >Log in</button>

                        <p>Don't have an account? <span className="text-primary">Sign up</span></p>
                    </Form>

                </Formik>

            </div>
        </div>
    )
}

export default Login

