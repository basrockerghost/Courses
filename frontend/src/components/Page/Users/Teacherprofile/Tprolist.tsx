import React from 'react'
import { useUserContext } from '../../../api/UserProvider'
import { useLocation, useNavigate } from 'react-router-dom';

const Tprolist:React.FC = () => {

    const location = useLocation();
    const teacher = location.state?.teacher;

    const {users} = useUserContext();

    const navigate = useNavigate();
    const handleClick = (student: any) => {
        navigate('/student', {state: {student}})
    }

    return (
        <div className="overflow-x-visible rounded-box border border-base-content/5 bg-base-100 max-h-[var(--tlistH)]">
            <table className="table">
                <thead>
                    <tr>
                        <th>StudentID</th>
                        <th>Name</th>
                        <th>Credits</th>
                        <th>GPA</th>
                    </tr>
                </thead>
                <tbody>
                {teacher.students
                    .map((s: any) => users.find((u: any) => u._id === s.studentsId))
                    .filter((student: any) => student !== undefined)
                    .map((student: any) => (
                        <tr key={student._id} className='cursor-pointer hover:bg-base-200' onClick={() => handleClick(student)}>
                            <td>{student.personalID}</td>
                            <td>{student.firstname} {student.lastname}</td>
                            <td>{student.totalCredits}</td>
                            <td>{student.GPA}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default Tprolist