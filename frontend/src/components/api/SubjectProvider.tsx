//SubjectProvider
import { createContext, useContext, useEffect, useState } from "react";
import api from "./Api";

interface Subject {
    _id: string;
    subjectID: string;
    subjectnameTH: string;
    subjectnameEN: string;
    credits: number;
    description: string;
}

interface SubjectContextType {
    subjects: Subject[];
    loading: boolean;
    error: string | null;
    success: string | null;
    addSubject: (newSubject: Omit<Subject, "_id">) => Promise<void>;
    updateSubject: (id: string, updatedSubject: Partial<Subject>) => Promise<void>;
    deleteSubject: (id: string) => Promise<void>;
}

const SubjectContext = createContext<SubjectContextType | undefined>(undefined);

export const SubjectProvider = ({ children }: { children: React.ReactNode }) => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchSubjects();
    }, []);
    
    const fetchSubjects = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.get("/get/subjects");
            setSubjects(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch subjects");
        } finally {
            setLoading(false);
        }
    };

    const addSubject = async (newSubject: Omit<Subject, "_id">) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.post("/create/subject", newSubject);
            setSubjects([...subjects, response.data]);
            setSuccess("Subject added successfully");
            fetchSubjects();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add subject");
        } finally {
            setLoading(false);
        }
    };

    const updateSubject = async (id: string, updatedSubject: Partial<Subject>) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.patch(`/edit/subject/${id}`, updatedSubject);
            setSubjects(subjects.map((subject) => (subject._id === id ? response.data : subject)));
            setSuccess("Subject updated successfully");
            fetchSubjects();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update subject");
        } finally {
            setLoading(false);
        }
    };

    const deleteSubject = async (id: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await api.delete(`/delete/subject/${id}`);
            setSubjects(subjects.filter((subject) => subject._id !== id));
            setSuccess("Subject deleted successfully");
            fetchSubjects();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to delete subject");
        } finally {
            setLoading(false);
        }
    };


    return (
        <SubjectContext.Provider value={{ subjects, loading, error, success, addSubject, updateSubject, deleteSubject }}>
            {children}
        </SubjectContext.Provider>
    );
};

export const useSubjectContext = () => {
    const context = useContext(SubjectContext);
    if (!context) throw new Error("useSubjectContext must be used within SubjectProvider");
    return context;
};