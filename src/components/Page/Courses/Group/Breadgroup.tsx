import React from 'react'

const Breadgroup:React.FC = () => {
    return (
        <div>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><a href='/course'>Course</a></li>
                    <li><a href='/category'>Category</a></li>
                    <li className='pointer-events-none'><a className='text-gray-500'>Group</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Breadgroup