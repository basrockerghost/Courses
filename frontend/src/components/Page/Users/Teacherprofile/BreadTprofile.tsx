import React from 'react'

const BreadTprofile:React.FC = () => {
    return (
        <div>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><a href='/teachers'>Teachers</a></li>
                    <li className='pointer-events-none'><a className='text-gray-500'>Profile</a></li>
                </ul>
            </div>
        </div>
    )
}

export default BreadTprofile