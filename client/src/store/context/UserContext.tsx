import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useUserQuery from '../../hooks/user/user-detail/useUserDetailQuery';
import { getLoginSuccess, loginRequest } from '../../apis/auth.api';
import { IUser, IUserContext } from '../../models/interfaces';
import { createSubmissionMap } from '../../utils/user-submission';
import {
    clearJwtUserLocally,
    getJwtUserLocally,
    saveJwtUserLocally,
} from '../../utils/localStorage';

type LoginState = { email: string; password: string };

export const UserContext = React.createContext<IUserContext>(null!);

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
    const { userDetail, refetch } = useUserQuery(user?._id, REFETCH_INTERVAL);

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

    const storeJwtData = (jwtToken: string, user: IUser) => {
        saveJwtUserLocally(jwtToken, user);
        setUser(user);
    };

    const login = useCallback(
        async (loginState: LoginState) => {
            // Use returned data as a global user data
            setIsLoading(true);
            const { ok, data, message } = await loginRequest(loginState);
            setIsLoading(false);

            if (data) storeJwtData(data.access_token, data.user);
            return { ok, data, message };
        },
        [navigate],
    );

    const logout = useCallback(async () => {
        setUser(null);
        clearJwtUserLocally();
        navigate('/login');
    }, []);

    useEffect(() => {
        const jwtData = getJwtUserLocally();
        if (jwtData) {
            setUser(jwtData.user);

            getLoginSuccess().then((res) => {
                if (!res.ok) {
                    setUser(null);
                    clearJwtUserLocally();
                }
            });
        }
    }, []);

    const value = {
        user,
        login,
        logout,
        storeJwtData,
        refetchDetail: refetch,
        isLoading,
        likedExerciseIdSet,
        submissionMap,
        userDetail,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
