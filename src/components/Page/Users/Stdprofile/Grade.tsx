import React from 'react'

const Grade:React.FC = () => {
    return (
        <select className="select select-sm max-w-xs">
            <option disabled selected>เกรด</option>
            <option>A</option>
            <option>B+</option>
            <option>B</option>
            <option>C+</option>
            <option>C</option>
            <option>D+</option>
            <option>D</option>
            <option>F</option>
        </select>
    )
}

export default Grade