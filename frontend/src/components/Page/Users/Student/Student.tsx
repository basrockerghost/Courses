import React, { useState } from 'react'
import Sboard from './Sboard'
import Smenulist from './Smenulist'
import Slist from './Slist'
import Saddmodal from './AddStudent/Saddmodal'

const Student:React.FC = () => {

    const [searchText, setSearchText] = useState('');

    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col gap-y-2 justify-between'>
                    <div className='flex items-center justify-between'>
                        <p className='text-2xl font-semibold'>All Students</p>
                        <Saddmodal/>
                    </div>
                    <Sboard/>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <Smenulist setSearchText={setSearchText} />
                    <Slist searchText={searchText} />
                </div>
            </div>
        </div>
    )
}

export default Student