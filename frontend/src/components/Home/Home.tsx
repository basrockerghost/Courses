import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const Home:React.FC = () => {
    return (
        <div className='fixed w-full h-full'>
            <div className='relative z-20'>
                <Navbar/>
            </div>
            <div className='relative z-10 flex md:h-[var(--displayheight)]'>
                <Sidebar/>
                <Outlet/>
            </div>
        </div>
    )
}

export default Home