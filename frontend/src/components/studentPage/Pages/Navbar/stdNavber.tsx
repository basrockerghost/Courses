import React from 'react'
import StdMemu from './StdMemu'
import logo from '../../../assets/logoคณะ.png'
import { useUserContext } from '../../../api/UserProvider'

const stdNavber:React.FC = () => {

    const {user} = useUserContext();

    return (
        <div className="navbar justify-between bg-base-100 shadow-sm px-4">
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
                <StdMemu/>
            </div>
        </div>
    )
}

export default stdNavber