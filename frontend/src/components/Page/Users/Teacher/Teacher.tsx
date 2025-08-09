import React, { useState } from 'react'
import Tboard from './Tboard'
import Tlist from './Tlist'
import Tmenulist from './Tmenulist'
import Taddmodal from './addTeacher/Taddmodal'

const Teacher:React.FC = () => {

    const [searchText, setSearchText] = useState('')
    
    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            
            <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col gap-y-2 justify-between'>
                    <div className='flex items-center justify-between'>
                        <p className='text-2xl font-semibold'>All Teachers</p>
                        <Taddmodal/>
                    </div>
                    <Tboard/>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <Tmenulist setSearchText={setSearchText} />
                    <Tlist searchText={searchText} />
                </div>
            </div>
        </div>
    )
}

export default Teacher