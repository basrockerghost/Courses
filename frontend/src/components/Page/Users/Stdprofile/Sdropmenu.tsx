// import React from 'react'
// import Seditsub from './Seditsub';

// const Sdropmenu:React.FC = () => {

//     const modalRef = React.useRef<HTMLDialogElement | null>(null);

//     const SEditSub = () => {
//         modalRef.current?.showModal();
//     };

//     return (
//         <div className="dropdown dropdown-right ">
//             <div tabIndex={0} role="button" className="btn btn-sm">Click</div>
//             <ul tabIndex={0} className="absolute dropdown-content menu bg-base-100 rounded-box z-30 w-36 p-2 shadow-sm">
//                 <li><a className='hover:bg-blue-400 hover:text-white' onClick={SEditSub}>Edit</a></li>
//                 <li><a className='hover:bg-red-400 hover:text-white'>Delete</a></li>
//             </ul>
//             <Seditsub modalRef={modalRef} />
//         </div>
//     )
// }

// export default Sdropmenu