import React from 'react'
import Cadropmenu from './Cadropmenu'

const Categorylist:React.FC = () => {
    return (
        <div className="rounded-box border border-base-content/5 bg-base-100 max-h-[var(--coursetableH)]">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Checkin</th>
                        <th>หมวดหมู่วิชา (th)</th>
                        <th>หมวดหมู่วิชา (en)</th>
                        <th>หน่วยกิตรวม</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <a role='button' className="btn btn-sm" href='/group'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                            </a>
                        </th>
                        <td>หมวดวิชาแกน</td>
                        <td>Core Subject</td>
                        <td>12</td>
                        <td className='relative w-52'>
                            <Cadropmenu/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Categorylist