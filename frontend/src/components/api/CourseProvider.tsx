import { createContext, useContext, useEffect, useState } from "react";
import api from "./Api";

interface Course {
    _id: string;
    CSId: string;
    coursenameTH: string;
    coursenameEN: string;
    courseStart: number;
    courseEnd: number;
    description: string;
}

interface CourseContextType {
    courses : Course[];
    loading: boolean;
    error: string | null;
    success: string | null;
    addCourse: (newCourse: Omit<Course, "_id">) => Promise<void>;
    updateCourse: (id: string, updatedCourse: Partial<Course>) => Promise<void>;
    deleteCourse: (id: string) => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children } : { children : React.ReactNode }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        fetchCourses();
    }, []);
    
    const fetchCourses = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.get("/get/courses");
            setCourses(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch courses");
        } finally {
            setLoading(false);
        }
    };

    const addCourse = async (newCourse: Omit<Course, "_id">) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.post("/create/course", newCourse);
            setCourses([...courses, response.data]);
            setSuccess("Course added successfully");
            fetchCourses();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to add course");
        } finally {
            setLoading(false);
        }
    };

    const updateCourse = async (id: string, updatedCourse: Partial<Course>) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const response = await api.patch(`/edit/course/${id}`, updatedCourse);
            setCourses(courses.map((course) => (course._id === id ? response.data : course)));
            setSuccess("Course updated successfully");
            fetchCourses();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to update course");
        } finally {
            setLoading(false);
        }
    };

    const deleteCourse = async (id: string) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await api.delete(`/delete/course/${id}`);
            setCourses(courses.filter((course) => course._id !== id));
            setSuccess("Course deleted successfully");
            fetchCourses();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to delete course");
        } finally {
            setLoading(false);
        }
    };
    
    return <CourseContext.Provider value={{ courses, loading, error, success, addCourse, deleteCourse, updateCourse }}>{children}</CourseContext.Provider>;
}

export const useCourseContext = () => {
    const context = useContext(CourseContext);
    if (!context) throw new Error("useCourseContext must be used within CourseProvider")
    return context;
}