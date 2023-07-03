
import google_brand from '../../assets/google_brand.svg'
import google_bg from '../../assets/google_bg.svg'

const Login = () => {

    return (
        <div className="grid grid-cols-[1fr_700px]">
            <div className="hero h-full bg-[url('src/assets/RegisterImg.png')]">
                <div className="bg-opacity-70 hero-overlay"></div>
            </div>

            <div className="flex flex-col items-center justify-center p-6">
                <h1 className="text-3xl font-bold text-red-600">Buen Sabor</h1>
                <h1 className="my-2 font-bold">Create an Account</h1>
                <p className="stat-title">Sign up now to get started with an account</p>
                <button className="w-[400px] mt-3  bg-white btn rounded-xl shadow "><img src={google_brand} alt="Google" /></button>

                <div className='grid w-[400px] grid-cols-[1fr_70px_1fr] mt-8 mb-5'>
                    <hr className='mt-3'/>
                    <div className='flex justify-center text-gray-400'>OR</div>
                    <hr className='mt-3'/>
                </div>

                <div className="form-control">
                    <div className="">
                        <label className="label">
                            <span className="label-text">Full name</span>
                        </label>
                        <input type="text" className="w-full input input-bordered" />
                    </div>
                    <div className="">
                        <label className="label">
                            <span className="label-text">Email address</span>
                        </label>
                        <input type="text" className="w-full input input-bordered" />
                    </div><div className="">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="text" className="w-full input input-bordered" />
                    </div><div className="">
                        <label className="label">
                            <span className="label-text">Comfirm Password</span>
                        </label>
                        <input type="text" className="w-full input input-bordered" />
                    </div>
                    <div className="flex flex-row items-center mt-5">
                        <input type="checkbox" className="mr-3 checkbox checkbox-primary checkbox-sm " />
                        <label htmlFor="">I have read and agree to the Terms of Service</label>
                    </div>
                </div>
                <button className="my-5 rounded-full btn btn-primary btn-wide">Get Start</button>
                <p>Already have an account? <span className="text-primary">Log in</span></p>
            </div>
        </div >
    )

}

export default Login