import React from 'react'
import Grade from './Grade'

const Schooselist:React.FC = () => {
    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-h-[var(--tprolistH)]">
                <table className="table">
                    <thead>
                        <tr>
                            <th>รหัสวิชา</th>
                            <th>ชื่อวิชา</th>
                            <th>หน่วยกิต</th>
                            <th>เกรด</th>
                            <th>เลือก</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>01000000</th>
                            <td>วิชาตัวอย่าง</td>
                            <td>3</td>
                            <td>
                                <Grade/>
                            </td>
                            <td className=''>
                                <input type="checkbox" className="checkbox" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Schooselist