import React from 'react'
import Dropmenu from './Dropmenu'
import { useUserContext } from '../../../api/UserProvider'

// Teacher list
const Tlist:React.FC = () => {

    const { users } = useUserContext();
    const teachers = users.filter(user => user.role === 'teacher')

    return (
        <div className="rounded-box border border-base-content/5 bg-base-100 max-h-[var(--tlistH)]">
            <table className="table">
                <thead>
                    <tr>
                        <th>Checkin</th>
                        <th>TeacherID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teacher => (
                        <tr key={teacher._id}>
                            <td>
                                <a role='button' className="btn btn-sm" href='/tprofile'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                                </a>
                            </td>
                            <td>{teacher.personalID}</td>
                            <td>{teacher.firstname} {teacher.lastname}</td>
                            <td>{teacher.role}</td>
                            <td className='relative w-52'>
                                <Dropmenu teacherId={teacher._id}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Tlist