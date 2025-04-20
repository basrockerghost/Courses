import React from 'react'
import CreateCategory from './CreateCategory'
import Categorylist from './Categorylist'

const Category:React.FC = () => {
    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex justify-between'>
                    <p className='text-2xl font-semibold'>Category</p>
                    <CreateCategory/>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <Categorylist/>
                </div>
            </div>
        </div>
    )
}

export default Category