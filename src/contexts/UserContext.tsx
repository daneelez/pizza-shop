import {createContext, useContext, useState} from "react";

const API_URL = process.env.REACT_APP_API_URL;
const PREFIX = "/user";

export type User = {
    id: string;
    name: string;
};

export type UserContextType = {
    user: User | null;
    login: (name: string, password: string) => Promise<void>;
    logout: () => void;
    register: (name: string, password: string) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);

    const register = async (name: string, password: string) => {
        try {
            const response = await fetch(`${API_URL}${PREFIX}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, password}),
            });

            if (response.ok) {
                const createdUser = await response.json();
                setUser(createdUser);
            } else {
                alert("Не удалось зарегистрироваться!")
            }

        } catch (error) {
            console.error(error);
        }
    }

    const login = async (name: string, password: string) => {
        try {
            const response = await fetch(`${API_URL}${PREFIX}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, password}),
            });

            if (response.ok) {
                const user = await response.json();
                setUser(user);
            } else {
                alert("Не удалось войти!")
            }

        } catch (error) {
            console.error(error);
        }
    }
    const logout = () => setUser(null);

    return (
        <UserContext.Provider value={{user, login, logout, register}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("No user contexts");

    return context;
}