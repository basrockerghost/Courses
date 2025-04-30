import React, { useState } from 'react'
import { useUserContext } from '../../api/UserProvider';
import { useNavigate } from 'react-router-dom';

const Email:React.FC = () => {

    const {requestReset} = useUserContext();
    const [personalID, setPersonalID] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await requestReset(personalID, email);
            setSuccess(`Request sent successfully. Click me!`);
        } catch (err: any) {
            setError(err.message || 'Failed to send request.');
        } finally {
            setLoading(false);
        }
    };

    const sendToReset = () => {
        navigate('/reset-password')
    }

    return (
        <form onSubmit={handleSubmit}>
            <p className='md:text-2xl text-xl md:font-medium mb-2'>Forget password?</p>
            <label className='block mb-2 text-lg' htmlFor="personalID">Personal ID</label>
            <input className="input border-theme w-full" type="text" id="personalID" name="personalID" value={personalID} onChange={(e) => setPersonalID(e.target.value)} required />
            <label className='block mb-2 text-lg' htmlFor="email">Email</label>
            <input className="input border-theme w-full" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" className="btn mt-4 mb-2 bg-theme text-white w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p onClick={sendToReset} className="text-success decoration-1 underline cursor-pointer ">{success}</p>}
        </form>
    )
}

export default Email