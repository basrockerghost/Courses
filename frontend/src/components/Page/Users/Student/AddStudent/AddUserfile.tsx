import React, { useState } from 'react'
import api from '../../../../api/Api'

//import user by using file
const Saddfile:React.FC = () => {

    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFile(e.target.files[0]);
            setError(null);
            setSuccess(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError('กรุณาเลือกไฟล์ก่อนอัปโหลด');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);
            setError(null);
            setSuccess(null);

            const response = await api.post('/upload/users', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                setSuccess('อัปโหลดสำเร็จ!');
                setFile(null);
            } else {
                setError('เกิดข้อผิดพลาดในการอัปโหลด');
            }
        } catch (error) {
            setError('เกิดข้อผิดพลาดในการอัปโหลด');
        } finally {
            setUploading(false);
        }
    };


    return (
        <fieldset className="py-4">
            <p className="font-semibold text-lg">Pick a file</p>
            <div className='flex items-center gap-x-4'>
                <input type="file" className="file-input" onChange={handleChange} />
                
                <button
                    className="btn bg-blue-500 text-white"
                    onClick={handleUpload}
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>
            {file && <p className="text-sm text-gray-600">Selected: {file.name}</p>}

            {success && <p className="text-sm text-green-500 mt-2">{success}</p>}
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </fieldset>
    )
}

export default Saddfile