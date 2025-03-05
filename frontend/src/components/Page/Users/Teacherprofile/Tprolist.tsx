import React from 'react'

const Tprolist:React.FC = () => {
    return (
        <div className="overflow-x-visible rounded-box border border-base-content/5 bg-base-100 max-h-[var(--tlistH)]">
            <table className="table">
                <thead>
                    <tr>
                        <th>Checkin</th>
                        <th>StudentID</th>
                        <th>Name</th>
                        <th>Credits</th>
                        <th>GPA</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <a role='button' className="btn btn-sm" href='/tprofile'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                            </a>
                        </td>
                        <td>6404800013</td>
                        <td>Something</td>
                        <td>0</td>
                        <td>0.00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Tprolist