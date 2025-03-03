import React from 'react'

const Bread:React.FC = () => {
    return (
        <div>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li className='pointer-events-none'><a className='text-gray-500'>Course</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Bread