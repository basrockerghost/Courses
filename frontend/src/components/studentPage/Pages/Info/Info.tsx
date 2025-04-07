import React, { useRef } from 'react'

const Info:React.FC = () => {

    const modalRef = useRef<HTMLDialogElement | null>(null);

    return (
        <div className='flex justify-between pl-4 pt-6'>
            <div>
                <p className='text-2xl font-bold'>Info</p>
                <p className='text-lg'>name : </p>
                <p className='text-lg'>credits: </p>
                <p className='text-lg'>GPA : </p>
            </div>
            <div className='flex items-end'>
                <button  className='btn btn-accent text-base-200'>
                    <label> เลือกหลักสูตร </label>
                </button>
            </div>
        </div>
    )
}

export default Info