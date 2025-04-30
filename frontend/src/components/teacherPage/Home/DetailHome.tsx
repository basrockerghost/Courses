import React from 'react'
import Navbar from '../Navbar/Navbar'
import DetailInfo from '../Info/DetailInfo'
import DetailList from '../Table/DetailList'

const DetailHome: React.FC = () => {
    return (
        <div className='fixed w-full h-full'>
            <div className='relative z-20'>
                <Navbar/>
            </div>
            <div className='relative z-10 flex flex-col px-4 md:h-[var(--displayheight)]'>
                <DetailInfo/>
                <div className='mt-4'>
                    <DetailList/>
                </div>
            </div>
        </div>
    )
}

export default DetailHome