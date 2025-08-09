import React from 'react'
import { useUserContext } from '../../api/UserProvider'

const Info:React.FC = () => {

    const { user } = useUserContext();

    return (
        <div className='flex justify-between pl-4 pt-6'>
            <div>
                <p className='text-2xl font-bold'>ข้อมูลรายละเอียดส่วนตัว</p>
                <p className='text-lg'><strong>รหัสบุคลากร (ID) :</strong> {user.personalID || "No ID"}</p>
                <p className='text-lg'><strong>ชื่อ-นามสกุล (Name) :</strong> {user.firstname + " " + user.lastname || "No name"}</p>
                <p className='text-lg'><strong>ตำแหน่ง (Role) :</strong> {user.role || "No role"}</p>
            </div>
        </div>
    )
}

export default Info