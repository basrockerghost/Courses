import React from 'react'

const Breadcat:React.FC = () => {
    return (
        <div>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><a href='/course'>Course</a></li>
                    <li className='pointer-events-none'><a className='text-gray-500 '>Category</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Breadcat