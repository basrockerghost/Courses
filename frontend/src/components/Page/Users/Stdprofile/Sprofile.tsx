import React, { useState } from 'react'
import Spromenu from './Spromenu'
import Sprolist from './Sprolist'
import Info from './Info'

const Sprofile:React.FC = () => {

    const [searchText, setSearchText] = useState('')

    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <div className='flex flex-col gap-y-4'>
                <div className='flex flex-col gap-y-4 justify-between'>
                    <Info/>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <Spromenu setSearchText={setSearchText} />
                    <Sprolist searchText={searchText} />
                </div>
            </div>
        </div>
    )
}

export default Sprofile