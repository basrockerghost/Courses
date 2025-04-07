//Group provider
import { createContext, useContext, useEffect, useState } from "react";
import api from "./Api";

interface Group {
    _id: string;
    groupnameTH: string;
    groupnameEN: string;
}

interface GroupContextType {
    groups: Group[];
    loading: boolean;
    error: string | null;
    success: string | null;
    addGroup: (newGroup: Omit<Group, "_id">) => Promise<void>;
    updateGroup: (id: string, updatedGroup: Partial<Group>) => Promise<void>;
    deleteGroup: (id: string) => Promise<void>;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider = ({ children }: { children: React.ReactNode }) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.get("/get/groups");
            setGroups(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch groups");
        } finally {
            setLoading(false);
        }
    };

    const addGroup = async (newGroup: Omit<Group, "_id">) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.post("/create/group", newGroup);
            setGroups([...groups, response.data]);
            setSuccess("Group added successfully");
            fetchGroups();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add group");
        } finally {
            setLoading(false);
        }
    };

    const updateGroup = async (id: string, updatedGroup: Partial<Group>) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.patch(`/edit/group/${id}`, updatedGroup);
            setGroups(groups.map((group) => (group._id === id ? response.data : group)));
            setSuccess("Group updated successfully");
            fetchGroups();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update group");
        } finally {
            setLoading(false);
        }
    };

    const deleteGroup = async (id: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await api.delete(`/delete/group/${id}`);
            setGroups(groups.filter((group) => group._id !== id));
            setSuccess("Group deleted successfully");
            fetchGroups();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to delete group");
        } finally {
            setLoading(false);
        }
    };


    return (
        <GroupContext.Provider value={{ groups, loading, error, success, addGroup, updateGroup, deleteGroup }}>
            {children}
        </GroupContext.Provider>
    );
};

export const useGroupContext = () => {
    const context = useContext(GroupContext);
    if (!context) throw new Error("useGroupContext must be used within GroupProvider");
    return context;
};