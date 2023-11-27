import React, { useContext, useEffect } from 'react'
import { AuthenticationContext } from '../Contexts/AuthenticationContextProvider'
import useAxiosSecure from './useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function useGetCurrentUserHook() {
    const { user } = useContext(AuthenticationContext);
    const queryClient = useQueryClient();
    const { data, isSuccess, isError, error } = useQuery({
        queryKey: ['users', user],
        queryFn: async () => {
            const axiosSecureInstance = useAxiosSecure();
            const response = await axiosSecureInstance.get(`/user?id=${user?.email}`);
            return response;
        }
    });

    if (error) {
        return "Fetch error";
    }
    if (isSuccess) {
        return data;
    }
}

export default useGetCurrentUserHook