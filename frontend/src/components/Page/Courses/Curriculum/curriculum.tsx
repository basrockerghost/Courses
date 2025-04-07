import React from 'react'
import Curlist from './Curlist'
import CreateCurr from './CreateCurr'

const curriculum:React.FC = () => {
    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex justify-between'>
                    <p className='text-2xl font-semibold'>โครงสร้างหลักสูตร</p>
                    <CreateCurr/>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <Curlist/>
                </div>
            </div>
        </div>
    )
}

export default curriculum