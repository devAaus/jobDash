"use client"

import { AuthData } from "@/types";
import { createContext, useState, ReactNode, useEffect } from "react";


export type AuthContextType = {
    auth: AuthData | null,
    setAuth: (data: AuthData) => void,
};

type AuthProviderProps = {
    children: ReactNode;
};


const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<AuthData | null>(null);

    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };
export default AuthProvider;
