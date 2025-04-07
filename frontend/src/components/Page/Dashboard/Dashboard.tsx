import React, { useEffect, useState } from 'react'
import Board from './Board'
import Notiboard from './Notiboard'
import { useLocation } from 'react-router-dom'
import { toast, Toaster } from 'sonner'

const Dashboard:React.FC = () => {

    const location = useLocation();
    const successMessage = location.state?.success || null;

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
        }
    }, [successMessage]);

    return (
        <div className='w-full h-screen pt-6 px-6 bg-base-100'>
            <Toaster richColors />
            <div>
                <div className='flex flex-col justify-between gap-y-4'>
                    <p className='text-2xl font-semibold'>Dashboard</p>
                    <Board/>
                </div>
                <div>
                    <Notiboard/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard