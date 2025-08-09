import React from 'react'
import Sdropmenu from './Sdropmenu'
import { useSubjectContext } from '../../../api/SubjectProvider';
import ViewDetail from './ViewDetail';

const Subjectlist:React.FC<{searchText: string}> = ({searchText}) => {

    const { subjects } = useSubjectContext();

    const filterSubjects = (searchText: string) => {
        if (!searchText) return subjects;
        return subjects.filter(subject => (
            subject.subjectID.toLowerCase().includes(searchText.toLowerCase()) ||
            subject.subjectnameTH.toLowerCase().includes(searchText.toLowerCase()) ||
            subject.subjectnameEN.toLowerCase().includes(searchText.toLowerCase())
        ))
    }

    return (
        <div className="rounded-box border border-base-content/10 bg-base-100 h-[var(--coursetableH)] overflow-x-auto scrollbar-hide">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>รหัสวิชา</th>
                        <th>ชื่อวิชา (th)</th>
                        <th>ชื่อวิชา (en)</th>
                        <th>หน่วยกิต</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                    {filterSubjects.length > 0 ? (
                        filterSubjects(searchText).map(subject => (
                            <tr key={subject._id}>
                                <td>{subject.subjectID}</td>
                                <td>{subject.subjectnameTH}</td>
                                <td>{subject.subjectnameEN}</td>
                                <td>{subject.credits}</td>
                                <td className='flex gap-x-2'>
                                    <ViewDetail subjectId={subject._id} />
                                    <Sdropmenu subjectId={subject._id} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center py-4">ไม่พบข้อมูล</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Subjectlist