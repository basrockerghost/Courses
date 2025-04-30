import React from 'react'
import { useLocation } from 'react-router-dom'

const Info:React.FC = () => {

    const location = useLocation()
    const student = location.state?.student

    if (!student) {
        return <p>No student found or any error</p>
    }

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Student Info</h1>
            <div className='flex gap-x-12'>
                <div>
                    <p><strong>ID:</strong> {student.personalID}</p>
                    <p><strong>Name:</strong> {student.firstname} {student.lastname}</p>
                    <p><strong>Role:</strong> {student.role}</p>
                </div>
                <div className='flex flex-col justify-end'>
                    <p><strong>Credits:</strong> {student.totalCredits}</p>
                    <p><strong>GPA:</strong> {student.GPA}</p>
                </div>
            </div>
        </div>
    )
}

export default Info