import React, { useState } from 'react'
import Createsubject from './Createsubject'
import Subjectlist from './Subjectlist'

const Subject:React.FC = () => {

    const [searchText, setSearchText] = useState('');

    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex justify-between'>
                    <p className='text-2xl font-semibold'>All Subject</p>
                    <Createsubject setSearchText={setSearchText} />
                </div>
                <div className='flex flex-col gap-y-4 '>
                    <Subjectlist   searchText={searchText} />
                </div>
            </div>
        </div>
    )
}

export default Subject