import React from 'react'
import logo from '../../assets/logoคณะ.png'

const Register:React.FC = () => {
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
                            <p className='md:text-2xl text-xl md:font-medium font mb-4'>Register</p>
                            <label className="fieldset-label">StudentID</label>
                            <input type="text" className="input border-theme" placeholder="StudentID" />
                            <label className="fieldset-label">Name</label>
                            <input type="text" className="input border-theme" placeholder="Name" />
                            <label className="fieldset-label">Lastname</label>
                            <input type="text" className="input border-theme" placeholder="Lastname" />
                            <label className="fieldset-label">Email</label>
                            <input type="email" className="input border-theme" placeholder="Email" />
                            <label className="fieldset-label">Password</label>
                            <input type="password" className="input border-theme" placeholder="Password" />
                            <label className="fieldset-label">Confirm Password</label>
                            <input type="password" className="input border-theme" placeholder="Confirm Password" />
                            <a role='button' className="btn mt-4 bg-theme text-white" href='/login'>Register</a>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register