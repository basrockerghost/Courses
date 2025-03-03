import React from 'react'

const Sbread:React.FC = () => {
    return (
        <div>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><a href='/students'>Students</a></li>
                    <li className='pointer-events-none'><a className='text-gray-500'>Profile</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Sbread