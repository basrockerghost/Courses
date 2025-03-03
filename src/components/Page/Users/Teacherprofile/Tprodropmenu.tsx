import React from 'react'

const Tprodropmenu:React.FC = () => {
    return (
        <div className="dropdown dropdown-right ">
            <div tabIndex={0} role="button" className="btn btn-sm">Click</div>
            <ul tabIndex={0} className="absolute dropdown-content menu bg-base-100 rounded-box z-30 w-36 p-2 shadow-sm">
                <li><a className='hover:bg-blue-400 hover:text-white'>Edit</a></li>
                <li><a className='hover:bg-red-400 hover:text-white'>Delete</a></li>
            </ul>
        </div>
    )
}

export default Tprodropmenu