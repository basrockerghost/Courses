import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Info from '../Info/Info'
import StdList from '../Table/StdList'
import Search from '../Search/Search'

const Home:React.FC = () => {

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className='fixed w-full h-full'>
            <div className='relative z-20'>
                <Navbar/>
            </div>
            <div className='relative z-10 flex flex-col px-4 md:h-[var(--displayheight)]'>
                <Info/>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className='max-h-[var(--height)] mt-4 overflow-y-auto scrollbar-hide'>
                    <StdList searchTerm={searchTerm}/>
                </div>
            </div>
        </div>
    )
}

export default Home