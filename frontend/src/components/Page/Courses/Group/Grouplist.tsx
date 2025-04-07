import React, { use, useEffect } from 'react'
import Gdropmenu from './Gdropmenu'
import { useGroupContext } from '../../../api/GroupProvider';

const Grouplist:React.FC = () => {

    const { groups } = useGroupContext();

    return (
        <div className="rounded-box border border-base-content/5 bg-base-100 max-h-[var(--coursetableH)]">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>กลุ่มวิชา (th)</th>
                        <th>กลุ่มวิชา (en)</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.length > 0 ? (
                        groups.map(group => (
                            <tr key={group._id}>
                                <td>{group.groupnameTH}</td>
                                <td>{group.groupnameEN}</td>
                                <td className='relative w-52'>
                                    <Gdropmenu groupId={group._id} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>
                                No group found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Grouplist