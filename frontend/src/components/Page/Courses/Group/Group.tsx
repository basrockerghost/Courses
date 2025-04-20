import React from 'react'
import Creategroup from './Creategroup'
import Grouplist from './Grouplist'

const Group:React.FC = () => {
    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex justify-between'>
                    <p className='text-2xl font-semibold'>Group</p>
                    <Creategroup/>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <Grouplist/>
                </div>
            </div>
        </div>
    )
}

export default Group