import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";

//validation form
const tokenResponseSchema = z.object({
    access_token: z.string()
});

const userSchema = z.object({
    id: z.number(),
    email: z.string().email(),
    username: z.string()
});

type User = z.infer<typeof userSchema>;

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>
    logout: () => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

//const BACK_URL = import.meta.env.VITE_API_URL_BACK;
const DEV_BACK_URL = import.meta.env.VITE_DEV_BACK_URL || "http://localhost:4000";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    /*const fetchUserData = async (token: string): Promise<User> => {
        const response = await fetch(`${DEV_BACK_URL}/api/users`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const userData = await response.json();
        if (!response.ok) throw new Error(userData.error || 'Invalid token');

        const validatedUser = userSchema.safeParse(userData);
        if (!validatedUser.success) {
            throw new Error("Invalid user data format");
        };

        return validatedUser.data;
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) { setLoading(false); return; };

            try {
                const userData = await fetchUserData(token);
                setUser(userData);
                setLoading(false);
            } catch (error) {
                console.error('Error validating token:', error);
                setLoading(false);
                logout();
            };
        };

        checkAuth();
    }, []);*/

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${DEV_BACK_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.msg || 'Login failed');
            };

            //token validation
            const tokenValidation = tokenResponseSchema.safeParse(data);
            if (!tokenValidation.success) {
                throw new Error("Invalid token format received");
            };

            const token = tokenValidation.data.access_token;
            localStorage.setItem('token', token);

            //user info from backend
            //const userData = await fetchUserData(token);

            //Save user info
            //localStorage.setItem('user', JSON.stringify(userData));

            //setUser(userData);
            navigate('/dashboard');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const value = useMemo(() => ({
        user,
        loading,
        error,
        login,
        logout,
    }), [user, loading, error]);

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};