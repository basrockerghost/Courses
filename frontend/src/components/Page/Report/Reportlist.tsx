import React from 'react'
import Remenulist from './Remenulist'

const Reportlist:React.FC = () => {
    return (
        // <ul>
        //     <li>Report 1</li>
        //     <li>Report 2</li>
        //     <li>Report 3</li>
        // </ul>
        <ul className="list bg-base-100 rounded-box shadow-md">
            
            <li className="list-row items-center">
                <div className="list-col-grow">
                    <div>
                        <p className="font-semibold">Report name</p>
                        <p className="text-xs opacity-60">Date</p>
                    </div>
                </div>
                <div>
                    <Remenulist/>
                </div>
            </li>
            
        </ul>

    )
}

export default Reportlist