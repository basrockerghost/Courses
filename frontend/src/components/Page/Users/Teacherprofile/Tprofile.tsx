import React from 'react'
import Tproboard from './Tproboard'
import Tpromenu from './Tpromenu'
import Tprolist from './Tprolist'
import Info from './Info'
import AddStd from './Modal/AddStd'

const Tprofile:React.FC = () => {
    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex flex-row items-end gap-y-4 justify-between'>
                    <Info/>
                    <AddStd/>
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