import React from 'react'
import Navbar from '../Navbar/stdNavber'
import Info from '../Info/Info'
import StdList from '../List/StdList'

const stdHome:React.FC = () => {
    return (
        <div className='fixed w-full h-full'>
            <div className='relative z-20'>
                <Navbar/>
            </div>
            <div className='relative z-10 flex flex-col px-4 md:h-[var(--displayheight)]'>
                <Info/>
                <div className=' mt-4 scrollbar-hide border border-base-content/25 rounded-lg'>
                    <StdList/>
                </div>
            </div>
        </div>
    )
}

export default stdHome