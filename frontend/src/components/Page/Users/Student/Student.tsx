import React from 'react'
import Breadstd from './Breadstd'
import Sboard from './Sboard'
import Smenulist from './Smenulist'
import Slist from './Slist'
import Saddmodal from './AddStudent/Saddmodal'

const Student:React.FC = () => {
    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <Breadstd/>
            <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col gap-y-2 justify-between'>
                    <div className='flex items-center justify-between'>
                        <p className='text-2xl font-semibold'>All Students</p>
                        <Saddmodal/>
                    </div>
                    <Sboard/>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <Smenulist/>
                    <Slist/>
                </div>
            </div>
        </div>
    )
}

export default Student