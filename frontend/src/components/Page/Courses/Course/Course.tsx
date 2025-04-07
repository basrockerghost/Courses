import React from 'react'
import CreateModal from './CreateModal'
import CourseList from './CourseList'
import Pinpage from './Pinpage'

const Course:React.FC = () => {
    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex justify-between'>
                    <p className='text-2xl font-semibold'>All Courses</p>
                    <CreateModal/>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <CourseList/>
                    <Pinpage/>
                </div>
            </div>
        </div>
    )
}

export default Course