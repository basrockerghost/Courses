import React from 'react'
import logo from '../../assets/logoคณะ.png'
import Email from '../Form/Email'

//Home page for reset password
const Home:React.FC = () => {
    return (
        <div className="fixed hero min-h-screen bg-base-100">
            <div className="hero-content flex-col lg:flex-row gap-x-24">
                <div className="flex flex-col items-center text-center">
                    <img className="w-36 md:w-56" src={logo} alt="" />
                    <h1 className="md:text-2xl text-xl md:font-bold font-semibold">Welcome to <br/> Enrolled for Com-Sci</h1>
                </div>
                <div className="card bg-base-100 md:w-sm shrink-0 shadow-md border border-theme">
                    <div className="card-body">
                        <Email/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home