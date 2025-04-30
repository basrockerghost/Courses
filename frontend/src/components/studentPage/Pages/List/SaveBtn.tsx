import React, { useState } from 'react'
import { useUserContext } from '../../../api/UserProvider';

const SaveBtn:React.FC = () => {

    return (
        <button
            className='btn bg-success text-base-100'  
        >
            save
        </button>
    )
}

export default SaveBtn