import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import ClockLoading from '../DataLoadingComponents/ClockLoading';
import { Box, Button } from '@mui/material';

function ClassDetails() {
    const id = useParams();
    const instance = useAxiosSecure();
    const navigate = useNavigate();

    const { data, isFetching, isSuccess, error } = useQuery({
        queryKey: ['class'],
        queryFn: () => {
            return instance.get(`/classDetails/${id.id}`);
        }
    });

    if (isFetching) {
        return (
            <div className="w-full flex flex-row justify-center items-center">
                <ClockLoading></ClockLoading>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                Query fetch error
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className='p-2'>
                <div className="form-control">
                    <label className="label font-bold">
                        <span className="label-text">Class Title</span>
                    </label>
                    <Box>{data.data.title}</Box>
                </div>
                <div className="form-control">
                    <label className="label font-bold">
                        <span className="label-text">Teacher name</span>
                    </label>
                    <Box>{data.data.name}</Box>
                </div>
                <div className="form-control">
                    <label className="label font-bold">
                        <span className="label-text">Email</span>
                    </label>
                    <Box>{data.data.email}</Box>
                </div>
                <div className="form-control">
                    <label className="label font-bold">
                        <span className="label-text">Price</span>
                    </label>
                    <Box>{data.data.price}</Box>
                </div>
                <div className="form-control">
                    <label className="label font-bold">
                        <span className="label-text">Description</span>
                    </label>
                    <Box>{data.data.description}</Box>
                </div>
                <div className="form-control">
                    <label className="label font-bold">
                        <span className="label-text">Total Enrollment</span>
                    </label>
                    <Box>{data.data.enroll}</Box>
                </div>
                <div className="form-control">
                    <label className="label font-bold">
                        <span className="label-text">Image</span>
                    </label>
                    <img src={data.data.image} className='max-w-full'></img>
                </div>
                <div className="form-control mt-6">
                    <Button variant="contained" onClick={() => {
                        navigate(`/payment/${id.id}`);
                    }}>Pay</Button>
                </div>

            </div>
        );
    }
}

export default ClassDetails