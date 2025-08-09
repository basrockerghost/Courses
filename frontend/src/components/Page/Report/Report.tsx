import React from 'react'
import Breadreport from './Breadreport'
import Menureport from './Menureport'
import Reportlist from './Reportlist'

const Report:React.FC = () => {
    return (
        <div className='w-full pt-6 px-6 bg-base-100'>
            <Breadreport/>
            <div className='flex flex-col gap-y-4'>
                <div className='flex justify-between'>
                    <p className='text-2xl font-semibold'>Report</p>
                    <Menureport/>
                </div>
                <div>
                    <Reportlist/>
                </div>
            </div>
        </div>
    )
}

export default Report