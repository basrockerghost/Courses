import React from 'react'
import Sdropmenu from './Sdropmenu'
import { useUserContext } from '../../../api/UserProvider'
import ViewDetail from './ViewDetail'
import { useNavigate } from 'react-router-dom'

const Slist:React.FC = () => {

    const { users } = useUserContext()
    const students = users.filter((user: any) => user.role === 'student')

    const navigate = useNavigate();
    const handleClick = (student: any) => {
        navigate('/student', {state: {student}})
    }

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
                    {students.map((s: any) => (
                        <tr key={s._id} className='cursor-pointer hover:bg-base-200' onClick={() => handleClick(s)}>
                            <td>{s.personalID}</td>
                            <td>{s.firstname} {s.lastname} </td>
                            <td>{s.role}</td>
                            <td>{s.totalCredits}</td>
                            <td>{s.GPA}</td>
                            <td className='w-36'>
                                {/* <Sdropmenu userId={s._id}/> */}
                                <div className='flex items-center gap-x-4'>
                                    <ViewDetail userId={s._id} />
                                    <Sdropmenu userId={s._id} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Slist