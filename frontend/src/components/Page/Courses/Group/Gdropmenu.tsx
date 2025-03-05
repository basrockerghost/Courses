import { useRef } from 'react';
import Gedit from './Gedit';

const Gdropmenu:React.FC = () => {

const modalRef = useRef<HTMLDialogElement | null>(null);

    const GEdit = () => {
        modalRef.current?.showModal();
    };


    return (
        <div className="dropdown dropdown-right ">
            <div tabIndex={0} role="button" className="btn btn-sm">Click</div>
            <ul tabIndex={0} className="absolute dropdown-content menu bg-base-100 rounded-box z-30 w-36 p-2 shadow-sm">
                <li><a className='hover:bg-blue-400 hover:text-white' onClick={GEdit}>Edit</a></li>
                <li><a className='hover:bg-red-400 hover:text-white'>Delete</a></li>
            </ul>
            <Gedit modalRef={modalRef} />
        </div>
    )
}

export default Gdropmenu