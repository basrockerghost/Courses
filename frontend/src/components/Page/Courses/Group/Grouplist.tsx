import React from 'react'
import Gdropmenu from './Gdropmenu'
import { useGroupContext } from '../../../api/GroupProvider';

const Grouplist:React.FC<{searchText: string}> = ({searchText}) => {

    const { groups } = useGroupContext();

    const filterGroups = (searchText: string) => {
        if (!searchText) return groups;
        return groups.filter(group => (
            group.groupnameTH.toLowerCase().includes(searchText.toLowerCase()) ||
            group.groupnameEN.toLowerCase().includes(searchText.toLowerCase())
        ))
    }

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
                    {filterGroups.length > 0 ? (
                        filterGroups(searchText).map(group => (
                            <tr key={group._id}>
                                <td>{group.groupnameTH}</td>
                                <td>{group.groupnameEN}</td>
                                <td>
                                    <Gdropmenu groupId={group._id} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center py-4">ไม่พบข้อมูล</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Grouplist