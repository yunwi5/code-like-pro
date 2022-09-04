import React, { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoginSuccess, loginRequest, logoutRequest } from '../../apis/auth';
import { ToastType } from '../../models/enums';
import { IUser } from '../../models/interfaces';
import { toastNotify } from '../../utils/notification/toast';

type LoginState = { email: string; password: string };
type ResponseType = { ok: boolean; message?: string; data?: IUser };

export interface IUSerContext {
    user: IUser | null;
    login: (loginState: LoginState) => Promise<ResponseType>;
    logout: () => void;
    loginBySession: () => void;
    isLoading: boolean;
}

export const UserContext = React.createContext<IUSerContext>({
    user: null,
    isLoading: false,
    login: () => ({} as any),
    logout: () => {},
    loginBySession: () => {},
});

// Custom hook for accessing UserContext
export const useUserContext = () => useContext(UserContext);

interface Props {
    children: React.ReactNode;
}

export const UserContextProvider: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const loginBySession = useCallback(async () => {
        setIsLoading(true);
        const { ok, data, message } = await getLoginSuccess();
        setIsLoading(false);
        if (ok) {
            setUser(data as any);
            console.log('Login Data:', data);
        }
    }, []);

    const login = useCallback(
        async (loginState: LoginState) => {
            // Use returned data as a global user data
            setIsLoading(true);
            const { ok, data, message } = await loginRequest(loginState);
            setIsLoading(false);

            // If the login is success, redirect to the home page.
            if (ok && data) {
                navigate('/');
                toastNotify('Login Successful!', ToastType.SUCCESS);
                setUser(data);
            }
            return { ok, data, message };
        },
        [navigate],
    );

    const logout = useCallback(async () => {
        setUser(null);
        // Send the logout request to clear the session
        const response = await logoutRequest();
        console.log('Logout response:', response);
    }, []);

    console.log('user:', user);

    const value = { user, login, logout, loginBySession, isLoading };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
