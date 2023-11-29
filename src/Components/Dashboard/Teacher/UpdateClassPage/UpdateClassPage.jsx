import React, { useState } from 'react'
import useLoggedinUser from '../../../../Hooks/useLoggedinUser'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ClockLoading from '../../../DataLoadingComponents/ClockLoading';
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';

function UpdateClassPage() {
    const user = useLoggedinUser();
    const instance = useAxiosSecure();
    const id = useParams();

    const [openModal, setOpenModal] = useState(false);
    const { data, isFetching, isSuccess } = useQuery({
        queryKey: ['classDetails'],
        queryFn: async () => {
            return instance.get(`/classDetails/${id.id}`)
        },

    });

    const { handleSubmit, register, getValues, formState: { errors } } = useForm();

    const mutation = useMutation({
        mutationFn: async (data) => {
            if (data) {
                return instance.patch(`/updateclass/${id.id}`, data);
            }
        }
    });

    const handleUpdateClassEvent = () => {
        setOpenModal(true);
    }

    if (isFetching) {
        return (
            <div className='w-full h-full flex flex-row justify-center items-center'>
                <ClockLoading></ClockLoading>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className='flex flex-col md:flex-row justify-center items-center gap-5 m-5'>
                <div className="hero min-h-full w-full">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        {
                            user &&
                            <form className="card-body" onSubmit={handleSubmit(handleUpdateClassEvent)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Class Title</span>
                                    </label>
                                    <input type="text" placeholder={data?.data?.title} className="input input-bordered" {...register('title', { required: true })} />
                                    {
                                        errors.title?.type === 'required' && <span className='text-red-600'>Required</span>
                                    }
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Teacher name</span>
                                    </label>
                                    <input type="text" value={data?.data?.name} className="input input-bordered" {...register('name')} disabled />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" value={data?.data?.email} className="input input-bordered" {...register('email')} disabled />

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Price</span>
                                    </label>
                                    <input type="number" placeholder={data?.data?.price} className="input input-bordered" {...register('price', { required: true })} />
                                    {
                                        errors.price?.type === 'required' && <span className='text-red-600'>Required</span>
                                    }
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <input type="text" placeholder={data?.data?.description} className="input input-bordered" {...register('description', { required: true })} />
                                    {
                                        errors.description?.type === 'required' && <span className='text-red-600'>Required</span>
                                    }
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Image</span>
                                    </label>
                                    <input type="text" placeholder={data?.data?.image} className="input input-bordered" {...register('image', { pattern: /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/ })} />
                                    {
                                        errors.image?.type === 'pattern' && <span className='text-red-600'>Must be valid URL</span>
                                    }
                                </div>

                                <div className="form-control mt-6">
                                    <Button variant="contained" type="submit" endIcon={<EditIcon />}>Update Class</Button>
                                </div>
                            </form>

                        }

                    </div>
                </div>
                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="text-center">
                            {
                                mutation.isPending &&
                                <div>
                                    <CircularProgress />
                                    <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Class is updating into database...
                                    </h1>
                                </div>
                            }
                            {
                                mutation.isSuccess &&
                                <div>
                                    <CheckIcon />
                                    <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Class is sucessfully Updated. Thanks
                                    </h1>
                                    <Button variant="contained" onClick={() => setOpenModal(false)}>Ok</Button>
                                </div>
                            }
                            {
                                mutation.isIdle &&
                                <div>
                                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                    <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to update Your class?
                                    </h1>
                                    <div className="flex justify-center gap-4">
                                        <Button variant="outlined" onClick={() => {
                                            const details = {
                                                title: getValues('title'),
                                                name: user.displayName,
                                                email: user.email,
                                                price: getValues('price'),
                                                description: getValues('description'),
                                                image: getValues('image'),
                                                status: 'pending'
                                            };
                                            mutation.mutate(details);
                                        }}>
                                            {"Yes, I'm sure"}
                                        </Button>
                                        <Button variant="outlined" onClick={() => setOpenModal(false)}>
                                            No, cancel
                                        </Button>
                                    </div>
                                </div>
                            }


                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
    return (
        <div>UpdateClassPage</div>
    )
}

export default UpdateClassPage