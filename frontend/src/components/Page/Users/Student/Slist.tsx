import React from 'react'
import Sdropmenu from './Sdropmenu'
import { useUserContext } from '../../../api/UserProvider'
import ViewDetail from './ViewDetail'
import { useNavigate } from 'react-router-dom'

const Slist:React.FC<{ searchText: string }> = ({ searchText }) => {

    const { users } = useUserContext()
    const students = users.filter((user: any) => user.role === 'student')

    const navigate = useNavigate();
    const handleClick = (student: any) => {
        navigate('/student', {state: {student}})
    }

    const filterStudents = (searchText: string) => {
        if (!searchText) return students;
        return students.filter((student: any) =>
            student.personalID.toLowerCase().includes(searchText.toLowerCase())
                || student.firstname.toLowerCase().includes(searchText.toLowerCase())
                || student.lastname.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-h-[var(--tlistH)]">
            <table className="table">
                <thead>
                    <tr>
                        <th>StudentID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Credits</th>
                        <th>GPA</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                    {filterStudents(searchText).length > 0 ? (
                        filterStudents(searchText).map((student: any) => (
                            <tr onClick={() => handleClick(student)} className='hover:cursor-pointer hover:bg-base-200' key={student._id}>
                                <td>{student.personalID}</td>
                                <td>{student.firstname} {student.lastname}</td>
                                <td>{student.role}</td>
                                <td>{student.totalCredits}</td>
                                <td>{student.GPA}</td>
                                <td className='flex gap-x-2' onClick={(e) => e.stopPropagation()}  >
                                    <ViewDetail userId={student._id} />
                                    <Sdropmenu userId={student._id} />
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

export default Slist