import React from 'react'
import StdMemu from './StdMemu'

const stdNavber:React.FC = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-none">
                <StdMemu/>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Profile</a>
            </div>
        </div>
    )
}

export default stdNavber