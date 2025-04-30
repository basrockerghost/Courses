import React, { useState } from 'react'
import { useUserContext } from '../../api/UserProvider'

const Password:React.FC = () => {

    const { resetpassword } = useUserContext()
    const [personalID, setPersonalID] = useState('')
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [conPassword, setConPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await resetpassword(personalID, email, newPassword, conPassword);
            setSuccess(`Password reset successfully.`);
        } catch (err: any) {
            setError(err.message || 'Failed to reset password.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <p className='md:text-2xl text-xl md:font-medium mb-2'>Reset Password</p>
            <label className='block mb-2 text-lg' htmlFor="personalID">Personal ID</label>
            <input className="input border-theme w-full" type="text" id="personalID" name="personalID" value={personalID} onChange={(e) => setPersonalID(e.target.value)} required />
            <label className='block mb-2 text-lg' htmlFor="email">Email</label>
            <input className="input border-theme w-full" type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label className='block mb-2 text-lg' htmlFor="newPassword">New Password</label>
            <input className="input border-theme w-full" type="password" id="newPassword" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
            <label className='block mb-2 text-lg' htmlFor="conPassword">Confirm Password</label>
            <input className="input border-theme w-full" type="password" id="conPassword" name="conPassword" value={conPassword} onChange={(e) => setConPassword(e.target.value)} required />
            

            <button type="submit" className="btn mt-4 bg-theme text-white w-full">
                {loading ? 'Confirming...' : 'Confirm'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-success">{success}</p>}
        </form>
    )
}

export default Password