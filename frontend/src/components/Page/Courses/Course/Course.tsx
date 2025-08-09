import React, { useState } from 'react'
import CreateModal from './CreateModal'
import CourseList from './CourseList'

const Course:React.FC = () => {

    const [searchText, setSearchText] = useState('');
    
    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex justify-between'>
                    <p className='text-2xl font-semibold'>All Courses</p>
                    <CreateModal setSearchText={setSearchText} />
                </div>
                <div className='flex flex-col gap-y-4'>
                    <CourseList searchText={searchText} />
                </div>
            </div>
        </div>
    )
}

export default Course