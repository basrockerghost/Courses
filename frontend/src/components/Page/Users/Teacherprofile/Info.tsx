import React from 'react'
import { useLocation } from 'react-router-dom'

const Info: React.FC = () => {

    const location = useLocation();
    const teacher = location.state?.teacher

    if (!teacher) {
        return <p>No teacher Info found or any error</p>
    }

    return (
        <div >
            <h1 className="text-xl font-bold mb-2">Teacher Info</h1>
            <div className='flex flex-col gap-y-2'>
                <p><strong>รหัสบุคลากร (ID) :</strong> {teacher.personalID}</p>
                <p><strong>ชื่อ-นามสกุล (Name-Surname) :</strong> {teacher.firstname} {teacher.lastname}</p>
                <p><strong>ตำแหน่ง (Role) :</strong> {teacher.role}</p>
            </div>
        </div>
    )
}

export default Info