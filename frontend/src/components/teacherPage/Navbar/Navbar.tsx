import React from 'react'
import Menu from './Menu'
import logo from '../../assets/logoคณะ.png'
import { useUserContext } from '../../api/UserProvider'

const Navbar: React.FC = () => {

    const {user} = useUserContext();
    console.log(user);

    return (
        <div className="navbar justify-between px-4 bg-base-100 shadow-sm">
            <div className='flex gap-x-4 items-center'>
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src={logo} />
                </div>
                <div>
                    <p className='text-lg font-semibold'>Com-Sci</p>
                </div>
            </div>
            <div className="flex items-center gap-x-4">
                <p className='text-lg font-semibold'>{user.firstname + " " + user.lastname}</p>
                <Menu/>
            </div>
        </div>
    )
}

export default Navbar