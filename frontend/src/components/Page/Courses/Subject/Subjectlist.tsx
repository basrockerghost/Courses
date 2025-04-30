import React from 'react'
import Sdropmenu from './Sdropmenu'
import { useSubjectContext } from '../../../api/SubjectProvider';
import ViewDetail from './ViewDetail';

const Subjectlist:React.FC = () => {

    const { subjects } = useSubjectContext();

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
                    {subjects.length > 0 ? (
                        subjects.map(subject => (
                            <tr key={subject._id}>
                                <td>{subject.subjectID}</td>
                                <td>{subject.subjectnameTH}</td>
                                <td>{subject.subjectnameEN}</td>
                                <td>{subject.credits}</td>
                                <td className='w-36'>
                                    {/* <Sdropmenu subjectId={subject._id} /> */}
                                    <div className='flex items-center gap-x-4'>
                                        <ViewDetail subjectId={subject._id} />
                                        <Sdropmenu subjectId={subject._id} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td>
                                No subject found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Subjectlist