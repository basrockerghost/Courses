import React from 'react'
import BreadTprofile from './BreadTprofile'
import Tproboard from './Tproboard'
import Tpromenu from './Tpromenu'
import Tprolist from './Tprolist'

const Tprofile:React.FC = () => {
    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <BreadTprofile/>
            <div className='flex flex-col gap-y-4'>
                <div className='flex flex-col gap-y-4 justify-between'>
                    <p className='text-2xl font-semibold'>
                        Teacher profile
                        <p className='text-base font-normal'>Name</p>
                    </p>
                    <Tproboard/>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <Tpromenu/>
                    <Tprolist/>
                </div>
            </div>
        </div>
    )
}

export default Tprofile