import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getLoginSuccess, loginRequest, logoutRequest } from '../../apis/auth.api';
import useUserQuery from '../../hooks/user/useUserDetailQuery';
import { IUser, IUserContext } from '../../models/interfaces';
import { createSubmissionMap } from '../../utils/user-submission';

type LoginState = { email: string; password: string };

export const UserContext = React.createContext<IUserContext>({
    user: null,
    isLoading: false,
    login: () => ({} as any),
    logout: () => {},
    loginBySession: () => {},
    likedExerciseIdSet: new Set(),
    submissionMap: {},
    userDetail: undefined,
});

// Custom hook for accessing UserContext
export const useUserContext = () => useContext(UserContext);

interface Props {
    children: React.ReactNode;
}

const REFETCH_INTERVAL = 2000;

export const UserContextProvider: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch user detail with ReactQuery only if the user is authenticated and user state is not null.
    const { userDetail } = useUserQuery(user?._id, REFETCH_INTERVAL);

    // Quickly find out whether the user liked the exercise or not in O(1) time.
    const likedExerciseIdSet = useMemo(() => {
        const likedIds = userDetail?.liked.map((ex) => ex._id) || [];
        return new Set(likedIds);
    }, [userDetail?.liked]);

    // Key: ExerciseID, value: IUserSubmission
    const submissionMap = useMemo(() => {
        if (!userDetail?.submissions) return {};
        return createSubmissionMap(userDetail.submissions);
    }, [userDetail?.submissions]);

    // Login with existing session so that the user does not have to login again when refreshing the page
    const loginBySession = useCallback(async () => {
        setIsLoading(true);
        const { ok, data } = await getLoginSuccess();
        setUser(() => {
            setIsLoading(false);
            if (ok && data) return data;
            return null;
        });
    }, []);

    const login = useCallback(
        async (loginState: LoginState) => {
            // Use returned data as a global user data
            setIsLoading(true);
            const { ok, data, message } = await loginRequest(loginState);
            setUser(() => {
                setIsLoading(false);
                if (ok && data) return data;
                return null;
            });
            return { ok, data, message };
        },
        [navigate],
    );

    const logout = useCallback(async () => {
        setUser(null);
        // Send the logout request to clear the session
        await logoutRequest();
    }, []);

    const value = {
        user,
        login,
        logout,
        loginBySession,
        isLoading,
        likedExerciseIdSet,
        submissionMap,
        userDetail,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
