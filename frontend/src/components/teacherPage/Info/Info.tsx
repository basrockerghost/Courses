import React from 'react'
import { useUserContext } from '../../api/UserProvider'

const Info:React.FC = () => {

    const { user } = useUserContext();

    return (
        <div className='flex justify-between pl-4 pt-6'>
            <div>
                <p className='text-2xl font-bold'>Info</p>
                <p className='text-lg'><strong>Name :</strong> {user.firstname + " " + user.lastname || "No name"}</p>
            </div>
        </div>
    )
}

export default Info