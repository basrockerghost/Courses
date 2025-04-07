import React, { useEffect } from 'react'
import { toast, Toaster } from 'sonner';

interface AlertProps {
    error: string | null;
    success: string | null;
}

const AlertLog:React.FC<AlertProps> = ({ error, success }) => {

    useEffect(() => {
        if (error) {
            toast.error(`Error: ${error}`);
        }
        if (success) {
            toast.success(success);
        }
    }, [error, success]);

    return <Toaster richColors />;
}

export default AlertLog