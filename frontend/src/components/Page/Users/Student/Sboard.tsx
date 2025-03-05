import React from 'react'

// Student board
const Sboard:React.FC = () => {
    return (
        <div className='flex gap-x-12 overflow-x-auto pb-3 md:pb-4'>
            <div className="card w-80 bg-base-100 card-md  md:h-full h-28 md:shadow-lg shadow-md border-1 border-gray-300">
                <div className="card-body flex-row items-center gap-x-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 md:size-8">
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <p className="md:text-xl text-base font-semibold">Something</p>
                        <h2 className="md:text-lg">Approved</h2>
                    </div>
                </div>
            </div>
            <div className="card w-80 bg-base-100 card-md md:h-full h-28 md:shadow-lg shadow-md border-1 border-gray-300">
                <div className="card-body flex-row items-center gap-x-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 md:size-8">
                        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <p className="md:text-xl text-base font-semibold">Something</p>
                        <h2 className="md:text-lg">Left</h2>
                    </div>
                </div>
            </div>
            <div className="card w-80 bg-base-100 card-md md:h-full h-28 md:shadow-lg shadow-md border-1 border-gray-300">
                <div className="card-body flex-row items-center gap-x-6">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 md:size-8">
                        <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                        <path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <p className="md:text-xl text-base font-semibold">Count</p>
                        <h2 className="md:text-lg">Students</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sboard