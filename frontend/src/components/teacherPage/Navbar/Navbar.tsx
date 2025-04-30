import React from 'react'
import Menu from './Menu'

const Navbar: React.FC = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-none">
                <Menu/>
            </div>
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Profile</a>
            </div>
        </div>
    )
}

export default Navbar