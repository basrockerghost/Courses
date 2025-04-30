import { createContext, useContext, useEffect, useState } from "react";
import api from "./Api";

interface Curriculum {
    _id: string;
    curriculumnameTH: string;
    curriculumnameEN: string;
    status: "ไม่พร้อมใช้งาน" | "ปิดปรับปรุง" | "พร้อมใช้งาน"
    description: string;
}

interface CurriculumContextType {
    curriculums: Curriculum[];
    loading: boolean;
    error: string | null;
    success: string | null;
    addCurriculum: (newCurriculum: Omit<Curriculum, "_id">) => Promise<void>;
    deleteCurriculum: (id: string) => Promise<void>;
    updateCurriculum: (id: string, updatedCurriculum: Partial<Curriculum>) => Promise<void>;
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined);

export const CurriculumProvider = ({ children } : { children: React.ReactNode }) => {
    const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchCurriculums();
    }, []);
    
    //fetch
    const fetchCurriculums = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.get("/get/curriculums");
            setCurriculums(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch curriculums");
        } finally {
            setLoading(false);
        }
    };

    const addCurriculum = async (newCurriculum: Omit<Curriculum, "_id">) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.post("/create/curriculum", newCurriculum);
            setCurriculums([...curriculums, response.data]);
            setSuccess("Curriculum added successfully");
            fetchCurriculums();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add curriculum");
        } finally {
            setLoading(false);
        }
    };

    const deleteCurriculum = async (id: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await api.delete(`/delete/curriculum/${id}`);
            setCurriculums(curriculums.filter((curriculum) => curriculum._id !== id));
            setSuccess("Curriculum deleted successfully");
            fetchCurriculums();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to delete curriculum");
        } finally {
            setLoading(false);
        }
    };

    const updateCurriculum = async (id: string, updatedCurriculum: Partial<Curriculum>) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.patch(`/edit/curriculum/${id}`, updatedCurriculum);
            
            // อัปเดตค่าใน state
            setCurriculums(curriculums.map(curriculum => 
                curriculum._id === id ? { ...curriculum, ...response.data } : curriculum
            ));
    
            setSuccess("Curriculum updated successfully");
            fetchCurriculums(); // โหลดข้อมูลใหม่
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update curriculum");
        } finally {
            setLoading(false);
        }
    };
    

    return <CurriculumContext.Provider value={{ curriculums, addCurriculum, deleteCurriculum, updateCurriculum, loading, error, success }}>{children}</CurriculumContext.Provider>;
};

export const useCurriculumContext = () => {
    const context = useContext(CurriculumContext);
    if(!context) throw new Error("useCurriculumContext must be used within a CurriculumProvider");
    return context;
}
