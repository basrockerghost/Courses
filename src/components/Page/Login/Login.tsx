import React from 'react'
import logo from '../../assets/logoคณะ.png'

const Login:React.FC = () => {
    return (
        <div className="fixed hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row gap-x-24">
                <div className="flex flex-col items-center text-center">
                    <img className="w-36 md:w-56" src={logo} alt="" />
                    <h1 className="md:text-2xl text-xl md:font-bold font-semibold">Welcome to <br/> Enrolled for Com-Sci</h1>
                </div>
                <div className="card bg-base-100 md:w-sm shrink-0 shadow-md border border-theme">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <p className='md:text-2xl text-xl md:font-medium font mb-4'>Login to Com-Sci</p>
                            <label className="fieldset-label">UserID</label>
                            <input type="text" className="input border-theme" placeholder="UserID" />
                            <label className="fieldset-label">Password</label>
                            <input type="password" className="input border-theme" placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <a role='button' className="btn mt-4 bg-theme text-white" href='/dashboard'>Login</a>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login