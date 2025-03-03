import React from 'react'
import Sdropmenu from './Sdropmenu'

const Subjectlist:React.FC = () => {
    return (
        <div className="rounded-box border border-base-content/5 bg-base-100 max-h-[var(--coursetableH)]">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>รหัสวิชา</th>
                        <th>ชื่อวิชา (th)</th>
                        <th>ชื่อวิชา (en)</th>
                        <th>หน่วยกิต</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                        </th>
                        <td>01000000</td>
                        <td>วิชาตัวอย่าง</td>
                        <td>Example Subject</td>
                        <td>3</td>
                        <td className='relative w-52'>
                            <Sdropmenu/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Subjectlist