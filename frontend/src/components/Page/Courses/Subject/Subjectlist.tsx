import React from 'react'
import Sdropmenu from './Sdropmenu'
import { useSubjectContext } from '../../../api/SubjectProvider';

const Subjectlist:React.FC = () => {

    const { subjects } = useSubjectContext();

    return (
        <div className="rounded-box border border-base-content/5 bg-base-100 max-h-[var(--coursetableH)]">
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
                                <td className='relative w-52'>
                                    <Sdropmenu subjectId={subject._id} />
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