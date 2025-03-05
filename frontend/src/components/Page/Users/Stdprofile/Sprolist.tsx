import React from 'react'
import Sdropmenu from './Sdropmenu'

const Sprolist:React.FC = () => {
    return (
        <div className="rounded-box border border-base-content/5 bg-base-100 max-h-[var(--tprolistH)]">
            <table className="table">
                <thead>
                    <tr>
                        <th>รหัสวิชา</th>
                        <th>ชื่อวิชา</th>
                        <th>หน่วยกิต</th>
                        <th>เกรด</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>01000000</th>
                        <td>วิชาตัวอย่าง</td>
                        <td>3</td>
                        <td>A</td>
                        <td className='relative w-52'>
                            <Sdropmenu/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Sprolist