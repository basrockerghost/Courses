import React, { useState } from 'react'
import Tpromenu from './Tpromenu'
import Tprolist from './Tprolist'
import Info from './Info'
import AddStd from './Modal/AddStd'

const Tprofile:React.FC = () => {

    const [searchText, setSearchText] = useState('');

    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex flex-row items-end gap-y-4 justify-between'>
                    <Info/>
                    <AddStd/>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <Tpromenu setSearchText={setSearchText} />
                    <Tprolist searchText={searchText} />
                </div>
            </div>
        </div>
    )
}

export default Tprofile