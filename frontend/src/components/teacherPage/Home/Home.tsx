import React from 'react'
import Navbar from '../Navbar/Navbar'
import Info from '../Info/Info'
import StdList from '../Table/StdList'

const Home:React.FC = () => {
    return (
        <div className='fixed w-full h-full'>
            <div className='relative z-20'>
                <Navbar/>
            </div>
            <div className='relative z-10 flex flex-col px-4 md:h-[var(--displayheight)]'>
                <Info/>
                <div className='max-h-[var(--height)] mt-4 overflow-y-auto scrollbar-hide'>
                    <StdList/>
                </div>
            </div>
        </div>
    )
}

export default Home