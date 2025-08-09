import React from 'react'
import { useUserContext } from '../../api/UserProvider'
import { useNavigate } from 'react-router-dom';

const Notiboard:React.FC = () => {

    const {users} = useUserContext();
    const student = users.filter((user: any) => user.role === 'student')
    const navigate = useNavigate();
    const handleClick = (student: any) => {
        navigate('/student', {state: {student}})
    }

    return (
        <div className="overflow-x-auto shadow-md sm:rounded-lg mt-6">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>Id</th>
                    <th>ชื่อ-นามสกุล</th>
                    <th>จำนวนรายวิชาที่ลงทะเบียน</th>
                </tr>
                </thead>
                <tbody>
                    {student.length > 0 ? (
                        student.map((student: any) => (
                            <tr key={student._id} className="hover:text-info cursor-pointer" onClick={() => handleClick(student)}>
                                <td>{student.personalID}</td>
                                <td>{student.firstname} {student.lastname}</td>
                                <td>{student.subjects.length}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center">No Student</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Notiboard