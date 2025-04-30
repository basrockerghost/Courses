import React from 'react'
import { useLocation } from 'react-router-dom'

const Info: React.FC = () => {

    const location = useLocation();
    const teacher = location.state?.teacher

    if (!teacher) {
        return <p>No teacher Info found or any error</p>
    }

    return (
        <div>
            <h1 className="text-xl font-bold mb-2">Teacher Info</h1>
            <p><strong>ID:</strong> {teacher.personalID}</p>
            <p><strong>Name:</strong> {teacher.firstname} {teacher.lastname}</p>
            <p><strong>Role:</strong> {teacher.role}</p>
        </div>
    )
}

export default Info