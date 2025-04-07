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

interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  success: string | null;
  addUser: (newUser: Omit<User, "_id">) => Promise<void>;
  deleteUser: (id:string) => Promise<void>;
  updateUser: (id: string, updateData: Partial<User>) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
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
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return <UserContext.Provider value={{ users, loading, error, success, addUser, deleteUser, updateUser }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used within UserProvider");
  return context;
};
