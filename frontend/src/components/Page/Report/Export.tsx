import React, { useRef } from 'react'

const Export:React.FC = () => {

    const modalRef = useRef<HTMLDialogElement | null>(null);
    
        const ExportReport = () => {
            modalRef.current?.showModal();
        };
    

    return (
        <div>
            <button className="btn" onClick={ExportReport}>Export</button>
            <dialog ref={modalRef} id="export_report" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p>
                </div>
            </dialog>
        </div>
    )
}

export default Export