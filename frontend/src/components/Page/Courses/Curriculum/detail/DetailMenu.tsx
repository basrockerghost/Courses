import React from 'react'

interface Props {
    subjectId: string;
}

const DetailMenu:React.FC<Props> = ({ subjectId }) => {



    return (
        <div className='dropdown dropdown-left dropdown-end'>
            <div tabIndex={0} role="button" className="btn btn-sm">Click</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-30 w-36 p-2 shadow-sm">
                {/* <li><a className='hover:bg-blue-400 hover:text-white' onClick={editForm} >Edit</a></li> */}
                {/* <li><a className='hover:bg-red-400 hover:text-white' onClick={handleDelete} >Delete</a></li> */}
            </ul>
            {/* {selectedCur && <EditCur modalRef={modalRef} curriculum={selectedCur} />} */}
        </div>
    )
}

export default DetailMenu