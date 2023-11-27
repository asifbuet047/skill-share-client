import React from 'react'
import useAxiosSecure from './useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';

function useTokenGeneration({ user }) {
    const axiosSecureInstance = useAxiosSecure();
    const mutation = useMutation({
        mutationKey: async () => {
            const response = await axiosSecureInstance.post('/api/v1/token', { mail: user.mail, uid: user.uid });
            return response;
        }
    });
    return mutation;
}

export default useTokenGeneration