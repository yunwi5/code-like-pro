import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getLoginSuccess, loginRequest, logoutRequest } from '../../apis/auth';
import { getUserDetail } from '../../apis/user';
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

const REFETCH_INTERVAL = 2500;

export const UserContextProvider: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch user detail with ReactQuery only if the user is authenticated and user state is not null.
    const { data: userDetail, error } = useQuery(
        ['user', { id: user?._id }],
        () => getUserDetail(user?._id || '').then((res) => res.data),
        {
            enabled: !!user?._id,
            refetchInterval: REFETCH_INTERVAL,
        },
    );

    if (error) console.log(error);

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

    const loginBySession = useCallback(async () => {
        setIsLoading(true);
        const { ok, data } = await getLoginSuccess();
        setIsLoading(false);
        if (ok) setUser(data as any);
    }, []);

    const login = useCallback(
        async (loginState: LoginState) => {
            // Use returned data as a global user data
            setIsLoading(true);
            const { ok, data, message } = await loginRequest(loginState);
            setIsLoading(false);

            // If the login is success, redirect to the home page.
            if (ok && data) setUser(data);
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
