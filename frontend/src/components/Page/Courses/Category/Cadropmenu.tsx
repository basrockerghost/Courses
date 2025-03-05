import React, { useRef } from 'react'
import Caedit from './Caedit';

const Cadropmenu:React.FC = () => {

const modalRef = useRef<HTMLDialogElement | null>(null);

    const CaEdit = () => {
        modalRef.current?.showModal();
    };

    
    return (
        <div className="dropdown dropdown-right ">
            <div tabIndex={0} role="button" className="btn btn-sm">Click</div>
            <ul tabIndex={0} className="absolute dropdown-content menu bg-base-100 rounded-box z-30 w-36 p-2 shadow-sm">
                <li><a className='hover:bg-blue-400 hover:text-white' onClick={CaEdit}>Edit</a></li>
                <li><a className='hover:bg-red-400 hover:text-white'>Delete</a></li>
            </ul>
            <Caedit modalRef={modalRef} />
        </div>

    )
}

export default Cadropmenu