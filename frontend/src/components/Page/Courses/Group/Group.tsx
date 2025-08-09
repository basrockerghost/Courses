import React, { useState } from 'react'
import Creategroup from './Creategroup'
import Grouplist from './Grouplist'

const Group:React.FC = () => {

    const [searchText, setSearchText] = useState('')

    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex justify-between'>
                    <p className='text-2xl font-semibold'>Group</p>
                    <Creategroup setSearchText={setSearchText} />
                </div>
                <div className='flex flex-col gap-y-4'>
                    <Grouplist searchText={searchText} />
                </div>
            </div>
        </div>
    )
}

export default Group