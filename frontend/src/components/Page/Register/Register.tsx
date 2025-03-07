import React from 'react'
import logo from '../../assets/logoคณะ.png'
import Regisform from './Regisform';

const Register:React.FC = () => {
    return (
        <div className="fixed hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row gap-x-24">
                <div className="flex flex-col items-center text-center">
                    <img className="w-36 md:w-56" src={logo} alt="" />
                    <h1 className="md:text-2xl text-xl md:font-bold font-semibold">Welcome to <br/> Enrolled for Com-Sci</h1>
                </div>
                <div className="card bg-base-100 md:w-lg shrink-0 shadow-md border border-theme">
                    <div className="card-body">
                        <Regisform/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register