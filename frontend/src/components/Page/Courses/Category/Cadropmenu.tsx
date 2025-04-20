import React, { useEffect, useRef, useState } from 'react'
import Caedit from './Caedit';
import { useCatContext } from '../../../api/CatProvider';

interface Props {
    catId: string
}

const Cadropmenu:React.FC<Props> = ({ catId }) => {

    const { categories, deleteCategory } = useCatContext();
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const [selectedCat, setSelectedCat] = useState<any>(null);

    const CaEdit = () => {
        const category = categories.find(category => category._id === catId);
        if(category) {
            setSelectedCat(category);
            modalRef.current?.showModal()
        }
    };

    useEffect(() => {
            if (selectedCat && modalRef.current) {
                modalRef.current.showModal();
            }
        }, [selectedCat]);

    const handleDelete = () => {
        if(window.confirm("Are you sure you want to delete this category?")) {
            deleteCategory(catId);
        }
    }
    
    return (
        <div className="dropdown dropdown-left dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm bg-warning/75 text-base-100">More</div>
            <ul tabIndex={0} className="absolute dropdown-content menu bg-base-100 rounded-box z-30 w-36 p-2 shadow-sm">
                <li><a className='hover:bg-blue-400 hover:text-white' onClick={CaEdit}>Edit</a></li>
                <li><a className='hover:bg-red-400 hover:text-white' onClick={handleDelete} >Delete</a></li>
            </ul>
            {selectedCat && <Caedit modalRef={modalRef} category={selectedCat} />}
        </div>

    )
}

export default Cadropmenu