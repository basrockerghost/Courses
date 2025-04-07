import React from 'react'

const StdMemu:React.FC = () => {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
                </button>
            </div>
            <ul
                tabIndex={0}
                className="menu dropdown-content left-0 bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-sm">
                <li><a>Setting</a></li>
                <li><a>Logout</a></li>
            </ul>
        </div>
    )
}

export default StdMemu