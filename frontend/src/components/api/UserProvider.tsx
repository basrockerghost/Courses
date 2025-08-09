import { createContext, useContext, useEffect, useState } from "react";
import api from "./Api";

interface User {
  _id: string;
  personalID: string;
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  role: "student" | "teacher" | "admin";
}

// interface UserContextType {
//   users: User[];
//   loading: boolean;
//   error: string | null;
//   success: string | null;
//   addUser: (newUser: Omit<User, "_id">) => Promise<void>;
//   deleteUser: (id:string) => Promise<void>;
//   updateUser: (id: string, updateData: Partial<User>) => Promise<void>
//   selectCurriculum: (id: string, curriculumId: string) => Promise<void>;
//   addSubjectToUser: (userId: string, subjectId: string, description: string) => Promise<void>;
//   updateSubjectGrade: (userId: string, subjectId: string, grade: string) => Promise<void>;
//   removeSubjectFromUser: (userId: string, subjectId: string) => Promise<void>;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);
const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser || storedUser === "undefined") return null;
      return JSON.parse(storedUser);
    } catch (e) {
      console.error("Failed to parse user from localStorage:", e);
      return null;
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.get("/get/users");
      setUsers(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const selectCurriculum = async (id: string, curriculumId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.patch(`/add/user/${id}/curriculum`, { curriculumId });
      setUsers(users.map((user) => (user._id === id ? response.data.user : user)));
      setSuccess("Curriculum selected successfully");
      fetchUsers();
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to select curriculum");
    } finally {
      setLoading(false);
    }
  };

  const addSubjectToUser = async (userId: string, subjectId: string, description: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.patch(`/add/user/${userId}/subject/${subjectId}`, {description});
      setUsers(users.map(user => user._id === userId ? response.data.user : user));
      setSuccess("Subject added successfully");
      fetchUsers();
      // setUser(response.data.user);
      // localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add subject");
    } finally {
      setLoading(false);
    }
  };

  // add term and year
  const addTermAndYear = async (userId: string, subjectId: string, termandyear: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.patch(`/add/user/${userId}/subject/${subjectId}/termandyear`, { termandyear });
      setUsers(users.map(user => user._id === userId ? response.data.user : user));
      setSuccess("Term and year added successfully");
      fetchUsers();
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add term and year");
    } finally {
      setLoading(false);
    }
  };
  
  const addStdToTeacher = async (teacherId: string, studentId: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.patch(`/add/teacher/${teacherId}/add-student`, { studentId });
      setUsers(users.map((user) => (user._id === teacherId ? response.data.teacher : user)));
      setSuccess("Student added to teacher successfully");
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add student to teacher");
    } finally {
      setLoading(false);
    }
  }
  
  const updateSubjectGrade = async (userId: string, subjectId: string, grade: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.patch(`/add/user/${userId}/subject/${subjectId}/grade`, { grade });
      setUsers(users.map(user => user._id === userId ? response.data.user : user));
      setSuccess("Grade updated successfully");
      fetchUsers();
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update grade");
    } finally {
      setLoading(false);
    }
  };  
  
  const removeSubjectFromUser = async (userId: string, subjectId: string) => {
    setLoading(true);
    try {
      await api.patch(`/delete/user/${userId}/subject/${subjectId}`);
      fetchUsers();
      setUser((prevUser: any) => {
        if (!prevUser) return null;
        const updatedSubjects = prevUser.subjects.filter((s: any) => s.subjectId !== subjectId);
        return { ...prevUser, subjects: updatedSubjects };
      });
      localStorage.setItem('user', JSON.stringify({
        ...user,
        subjects: user.subjects.filter((s: any) => s.subjectId !== subjectId)
      }));
      setSuccess("Subject removed successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to remove subject");
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (newUser: Omit<User, "_id">) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.post("/add/user", newUser);
      setUsers([...users, response.data]);
      setSuccess("User added successfully");
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  const requestReset = async (personalID: string, email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.post('/auth/request-reset', { personalID, email });
      setSuccess(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to request reset password");
    } finally {
      setLoading(false);
    }
  }

  const resetpassword = async (personalID: string, email: string, newPassword: string, conPassword: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.post('/auth/reset-password', { personalID, email, newPassword, conPassword });
      setSuccess(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  const deleteUser = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await api.delete(`/delete/user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      setSuccess("User deleted successfully");
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, updateData: Partial<User>) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await api.patch(`/edit/user/${id}`, updateData);
      setUsers(users.map((user) => (user._id === id ? response.data : user)));
      setSuccess("User updated successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return <UserContext.Provider value={{ users, user, setUser, loading, error, success, selectCurriculum, addTermAndYear, addSubjectToUser, addStdToTeacher, updateSubjectGrade, removeSubjectFromUser, addUser, requestReset, resetpassword, deleteUser, updateUser }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used within UserProvider");
  return context;
};
