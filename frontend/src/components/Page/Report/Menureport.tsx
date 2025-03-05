import React from 'react'
import Filter from './Filter'
import Export from './Export'

const Menureport:React.FC = () => {
    return (
        <div className='flex items-center justify-between'>
            <Filter/>
            <Export/>
        </div>
    )
}

export default Menureport

