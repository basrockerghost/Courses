import { createContext, useContext, useEffect, useState } from "react";
import api from "./Api";

interface Category {
    _id: string;
    catnameTH: string;
    catnameEN: string;
}

interface CatContextType {
    categories : Category[];
    loading: boolean;
    error: string | null;
    success: string | null;
    addCategory: (newCategory: Omit<Category, "_id">) => Promise<void>;
    updateCategory: (id: string, updatedCategory: Partial<Category>) => Promise<void>;
    deleteCategory: (id: string) => Promise<void>;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

export const CatProvider = ({ children }: { children: React.ReactNode }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.get("/get/categories");
            setCategories(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch categories");
        } finally {
            setLoading(false);
        }
    };

    const addCategory = async (newCategory: Omit<Category, "_id">) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.post("/create/category", newCategory);
            setCategories(((prev) => [...prev, response.data]));
            setSuccess("Category added successfully");
            fetchCategories();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add category");
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (id: string, updatedCategory: Partial<Category>) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.patch(`/edit/category/${id}`, updatedCategory);
            setCategories((prev) =>
                prev.map((category) => (category._id === id ? response.data : category))
            );
            setSuccess("Category updated successfully");
            fetchCategories();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update category");
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await api.delete(`/delete/category/${id}`);
            setCategories((prev) => prev.filter((category) => category._id !== id));
            setSuccess("Category deleted successfully");
            fetchCategories();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to delete category");
        } finally {
            setLoading(false);
        }
    };


    return <CatContext.Provider value={{ categories, loading, error, success, addCategory, updateCategory, deleteCategory }}>{children}</CatContext.Provider>;
}

export const useCatContext = () => {
    const context = useContext(CatContext);
    if (!context) throw new Error("useCatContext must be used within CatProvider")
    return context;
}