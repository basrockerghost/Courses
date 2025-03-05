import React from 'react'

const Breadsubject:React.FC = () => {
    return (
        <div>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><a href='/course'>Course</a></li>
                    <li><a href='/category'>Category</a></li>
                    <li><a href='/group'>Group</a></li>
                    <li className='pointer-events-none'><a className='text-gray-500'>Subject</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Breadsubject