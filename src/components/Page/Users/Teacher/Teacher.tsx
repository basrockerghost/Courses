import React from 'react'
import Breadteacher from './Breadteacher'
import Tboard from './Tboard'
import Tlist from './Tlist'
import Tmenulist from './Tmenulist'
import Taddmodal from './Taddmodal'

const Teacher:React.FC = () => {
    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <Breadteacher/>
            <div className='flex flex-col gap-y-2'>
                <div className='flex flex-col gap-y-2 justify-between'>
                    <div className='flex items-center justify-between'>
                        <p className='text-2xl font-semibold'>All Teachers</p>
                        <Taddmodal/>
                    </div>
                    <Tboard/>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <Tmenulist/>
                    <Tlist/>
                </div>
            </div>
        </div>
    )
}

export default Teacher