import React from 'react'
import { useUserContext } from '../../api/UserProvider'
import { useNavigate } from 'react-router-dom';

interface Props {
    searchTerm: string;
}

const StdList:React.FC<Props> = ({searchTerm}) => {
    
    const { user, users } = useUserContext();

    const navigate = useNavigate();
    const handleClick = (studentId: any) => {
        navigate('/homeT/student', {state: {studentId}})
    }

    const filteredStudents = user?.students
        ?.map((s: any) => users.find((u: any) => u._id === s.studentsId))
        ?.filter((student: any) => student !== undefined)
        .filter((student: any) =>
            student.personalID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.lastname.toLowerCase().includes(searchTerm.toLowerCase())
        );
        

    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-h-[var(--tlistH)]">
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
                {/* {user?.students?.length > 0 ? (
                    user.students
                        .map((s: any) => users.find((u: any) => u._id === s.studentsId))
                        .filter((student: any) => student !== undefined)
                        .map((student: any) => (
                            <tr key={student._id} className='cursor-pointer hover:bg-base-200' onClick={() => handleClick(student._id)}>
                                <td>{student.personalID}</td>
                                <td>{student.firstname} {student.lastname}</td>
                                <td>{student.totalCredits}</td>
                                <td>{student.GPA}</td>
                            </tr>
                        ))
                    ) : (
                        <div>Nothing</div>
                    )
                } */}
                    {filteredStudents?.length > 0 ? (
                        filteredStudents.map((student: any) => (
                            <tr key={student._id} className='cursor-pointer hover:bg-base-200' onClick={() => handleClick(student._id)}>
                                <td>{student.personalID}</td>
                                <td>{student.firstname} {student.lastname}</td>
                                <td>{student.totalCredits}</td>
                                <td>{student.GPA}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center">ไม่พบข้อมูล</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default StdList