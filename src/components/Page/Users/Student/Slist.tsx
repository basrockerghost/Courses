import React from 'react'
import Sdropmenu from './Sdropmenu'

const Slist:React.FC = () => {
    return (
        <div className="rounded-box border border-base-content/5 bg-base-100 max-h-[var(--tlistH)]">
            <table className="table">
                <thead>
                    <tr>
                        <th>Checkin</th>
                        <th>StudentID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Menu</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <a role='button' className="btn btn-sm" href='/sprofile'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                            </a>
                        </td>
                        <td>6404800013</td>
                        <td>Something</td>
                        <td>Student</td>
                        <td className='relative w-52'>
                            <Sdropmenu/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Slist