import React from 'react'
import StdMemu from './StdMemu'

const stdNavber:React.FC = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm px-4">
            <div className="flex-1 navbar-start">
                <a className="btn btn-ghost text-xl">Profile</a>
            </div>
            <div className="navbar-end">
                <StdMemu/>
            </div>
        </div>
    )
}

export default stdNavber