import { useMutation } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from './useAxiosSecure';

function useAddClass(classDetails) {
    console.log(classDetails);
    const axiosSecureInstance = useAxiosSecure();
    const { data, isSuccess, error } = useMutation({
        mutationFn: async () => {
            return axiosSecureInstance.post('/addclass', classDetails);
        }
    });

    if (isSuccess) {
        console.log(data);
    }
    if (error) {
        console.log(error);
    }
}

export default useAddClass