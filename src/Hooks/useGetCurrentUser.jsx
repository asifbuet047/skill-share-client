import { useContext } from 'react';
import { AuthenticationContext } from '../Contexts/AuthenticationContextProvider'
import useAxiosSecure from './useAxiosSecure';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function useGetCurrentUser() {
    const { user } = useContext(AuthenticationContext);
    
    const data = useQuery({
        queryKey: ['users'],
        queryFn: () => {
            const instance = useAxiosSecure();
            return instance.get(`/user?id=${user?.email}`);
        }
    });

    return data;
}

export default useGetCurrentUser