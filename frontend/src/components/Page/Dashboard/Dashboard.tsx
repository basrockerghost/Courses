import React from 'react'
import Breaddashboard from './Breaddashboard'
import Board from './Board'
import Notiboard from './Notiboard'

const Dashboard:React.FC = () => {
    return (
        <div className='w-full h-screen pt-6 px-6 bg-base-100'>
            <Breaddashboard/>
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