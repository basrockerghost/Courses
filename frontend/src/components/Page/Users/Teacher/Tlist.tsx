import React from 'react'
import Dropmenu from './Dropmenu'
import { useUserContext } from '../../../api/UserProvider'
import { useNavigate } from 'react-router-dom';

// Teacher list
const Tlist:React.FC = () => {

    const { users } = useUserContext();
    const teachers = users.filter((user: any) => user.role === 'teacher')

    const navigate = useNavigate();
    const handleRowClick = (teacher: any) => {
        navigate('/teacher', {state: {teacher}});
    }

    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 max-h-[var(--tlistH)]">
            <table className="table">
                <thead>
                    <tr>
                        <th>TeacherID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.length > 0 ? (
                        teachers.map((teacher: any) => (
                            <tr key={teacher._id} className='cursor-pointer hover:bg-base-200' onClick={() => handleRowClick(teacher)}>
                                <td>{teacher.personalID}</td>
                                <td>{teacher.firstname} {teacher.lastname}</td>
                                <td>{teacher.role}</td>
                                <td className='w-36' onClick={(e) => e.stopPropagation()}>
                                    <Dropmenu teacherId={teacher._id}/>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} className="text-center py-4">
                                No teachers
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Tlist