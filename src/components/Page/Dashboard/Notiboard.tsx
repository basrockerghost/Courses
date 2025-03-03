import React from 'react'

const Notiboard:React.FC = () => {
    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
  
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Student</li>
            
            <li className="list-row hover:bg-base-200">
                <div className="flex items-center gap-x-4">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://daisyui.com/images/stock/photo-1534528741727-eadc9d34d4fa.jpg" />
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold">Student name</p>
                        <p className="text-xs opacity-60">StudentID</p>
                    </div>
                </div>
            </li>
            
        </ul>
    )
}

export default Notiboard