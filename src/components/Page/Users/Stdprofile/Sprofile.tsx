import React from 'react'
import Sbread from './Sbread'
import Sproboard from './Sproboard'
import Spromenu from './Spromenu'
import Sprolist from './Sprolist'
import Schoosesub from './Schoosesub'

const Sprofile:React.FC = () => {

    const modalRef = React.useRef<HTMLDialogElement | null>(null);

    const SChoose = () => {
        modalRef.current?.showModal();
    };


    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <Sbread/>
            <div className='flex flex-col gap-y-4'>
                <div className='flex flex-col gap-y-4'>
                    <div className='flex items-center justify-between'>
                        <div className='text-2xl font-semibold'>
                            <p>Student name</p>
                            <p className='text-base font-normal'>StudentID</p>
                        </div>
                        <div>
                            <p role='button' className='btn' onClick={SChoose}>choose</p>
                        </div>
                        <Schoosesub modalRef={modalRef}/>
                    </div>
                    <Sproboard/>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <Spromenu/>
                    <Sprolist/>
                </div>
            </div>
        </div>
    )
}

export default Sprofile