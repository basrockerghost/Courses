import React from 'react'
import Gdropmenu from './Gdropmenu'

const Grouplist:React.FC = () => {
    return (
        <div className="rounded-box border border-base-content/5 bg-base-100 max-h-[var(--coursetableH)]">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Checkin</th>
                        <th>กลุ่มวิชา (th)</th>
                        <th>กลุ่มวิชา (en)</th>
                        <th>หน่วยกิตรวม</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <a role='button' className="btn btn-sm" href='/subject'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                            </a>
                        </th>
                        <td>กลุ่มวิชาแกน</td>
                        <td>Core Group</td>
                        <td>12</td>
                        <td className='relative w-52'>
                            <Gdropmenu/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Grouplist