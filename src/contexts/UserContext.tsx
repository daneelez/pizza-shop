import {createContext, useContext, useEffect, useState} from "react";
import {succesToaster, errorToaster} from "../components/notify_toaster/NotifyToaster";

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

    useEffect(() => {
        const curUser = localStorage.getItem("user");
        if (curUser) setUser(JSON.parse(curUser));
    }, []);

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
                succesToaster('Успешная регистрация!');
                const createdUser = await response.json();
                setUser(createdUser);
                localStorage.setItem("user", JSON.stringify(createdUser));
            } else {
                errorToaster('Ошибка регистрации!')
            }

        } catch (error) {
            errorToaster('Ошибка регистрации!')
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
                succesToaster('Успешный вход!');
                const user = await response.json();
                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                errorToaster('Ошибка входа!')
            }

        } catch (error) {
            errorToaster('Ошибка входа!')
        }
    }
    const logout = () => {
        succesToaster('Успешный выход!');
        setUser(null);
        localStorage.removeItem("user");
    }

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