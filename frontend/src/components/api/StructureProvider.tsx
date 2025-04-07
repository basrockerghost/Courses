import { createContext, useContext, useEffect, useState } from "react";
import api from "./Api";

export interface Subject {
    _id:string;
    subjectId: string;
}

export interface Group {
    _id: string;
    groupId: string;
    subjects: Subject[];
}

export interface Category {
    _id: string;
    categoryId: string;
    groups: Group[];
}

export interface Structure {
    _id: string;
    curriculumId: string;
    courseId: string;
    categories: Category[];
}

interface StructureContextType {
    structures: Structure[];
    loading: boolean;
    error: string | null;
    success: string | null;
    fetchStructures: () => Promise<void>;
    addStructure: (newStructure: Omit<Structure, "_id">) => Promise<void>;
    addCategory: (structureId: string, categoryId: string) => Promise<void>;
    addGroup: (structureId: string, categoryId: string, groupId: string) => Promise<void>;
    addSubject: (structureId: string, categoryId: string, groupId: string, subjectId: string[]) => Promise<void>;
}

const StructureContext = createContext<StructureContextType | undefined>(undefined);

export const StructureProvider = ({ children }: { children: React.ReactNode }) => {
    const [structures, setStructures] = useState<Structure[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchStructures();
    }, []);

    // ดึงข้อมูลทั้งหมด
    const fetchStructures = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.get("/get/structures");
            setStructures(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch structures");
        } finally {
            setLoading(false);
        }
    };

    // เพิ่ม Structure ใหม่
    const addStructure = async (newStructure: Omit<Structure, "_id">) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.post("/create/structure", newStructure);
            setStructures([...structures, response.data]);
            setSuccess("Structure added successfully");
            fetchStructures();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add structure");
        } finally {
            setLoading(false);
        }
    };

    //เพิ่ม category
    const addCategory = async (structureId: string, categoryId: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await api.post(`/create/structure/${structureId}/category`, { categoryId });
            setSuccess("Category added successfully");
            fetchStructures();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add category");
        } finally {
            setLoading(false);
        }
    };

    // เพิ่ม Group ใน Category ที่มีอยู่
    const addGroup = async (structureId: string, categoryId: string, groupId: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {

            const structure = structures.find(s => s._id === structureId);
            if (!structure) {
                setError("Structure not found");
                return;
            }

            const existingGroups = structure.categories.flatMap(cat => cat.groups.map(group => group.groupId));
            if (existingGroups.includes(groupId)) {
                setError("Group already exists");
                return;
            }
            

            await api.post(`/create/structure/${structureId}/category/${categoryId}/group`, { groupId });
            setSuccess("Group added successfully");
            fetchStructures();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add group");
        } finally {
            setLoading(false);
        }
    };

    // เพิ่ม Subject ใน Group ที่มีอยู่
    const addSubject = async (structureId: string, categoryId: string, groupId: string, subjectId: string[]) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {

            const structure = structures.find(s => s._id === structureId);
            if (!structure) {
                setError("Structure not found");
                return;
            }

            // 🔍 Flatten all existing subjectIds in the structure
            const existingSubjectIds = structure.categories.flatMap(cat =>
                cat.groups.flatMap(group =>
                    group.subjects.map(sub => sub.subjectId)
                )
            );

            // ❌ Find duplicates
            const duplicateSubjects = subjectId.filter(id => existingSubjectIds.includes(id));
            if (duplicateSubjects.length > 0) {
                setError(`Subject(s) already exist: ${duplicateSubjects.join(", ")}`);
                return;
            }

            await api.post(`/create/structure/${structureId}/category/${categoryId}/group/${groupId}/subject`, { subjectId });
            setSuccess("Subject added successfully");
            fetchStructures();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add subject");
        } finally {
            setLoading(false);
        }
    };

    return (
        <StructureContext.Provider value={{ structures, addStructure, addCategory, addGroup, addSubject, fetchStructures, loading, error, success }}>
            {children}
        </StructureContext.Provider>
    );
};

// Hook สำหรับใช้งาน Context
export const useStructureContext = () => {
    const context = useContext(StructureContext);
    if (!context) throw new Error("useStructureContext must be used within a StructureProvider");
    return context;
};
