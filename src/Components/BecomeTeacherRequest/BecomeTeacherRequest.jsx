import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import useLoggedinUser from '../../Hooks/useLoggedinUser';
import { Avatar, Box, Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Button } from 'flowbite-react';
import ClockLoading from '../DataLoadingComponents/ClockLoading';
import { NavLink } from 'react-router-dom';

function BecomeTeacherRequest() {
    const user = useLoggedinUser();
    const instance = useAxiosSecure();
    const [experience, setExperience] = useState('Beginner');
    const [category, setCategory] = useState('Web Development');
    const { handleSubmit, register, getValues, formState: { errors } } = useForm();

    const { data, mutate, isPending, isSuccess, isIdle } = useMutation({
        mutationFn: (data) => {
            return instance.post('/teachrequest', data);
        },
        onSuccess: (data) => {
            console.log(data);
        }
    });

    const teachrequest = useQuery({
        queryKey: ['teachrequest'],
        queryFn: () => {
            return instance.get(`/teachrequest?id=${user.email}`);
        }
    });

    const handleSubmitForReview = () => {
        const request = {
            name: user.displayName,
            email: user.email,
            status: 'pending',
            title: getValues('title'),
            experience: experience,
            category: category
        };
        // mutate(request);
    }

    const handleExperienceChange = (event) => {
        setExperience(event.target.value);
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    }

    return (
        <div className="flex flex-row justify-center items-center">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                {
                    <div>
                        {
                            teachrequest.isSuccess &&
                            <div>
                                {
                                    teachrequest.data.data?.student ?
                                        <form className="card-body" onSubmit={handleSubmit(handleSubmitForReview)}>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Teacher name</span>
                                                </label>
                                                <input type="text" value={user.displayName} className="input input-bordered" disabled />
                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Teacher mage</span>
                                                </label>
                                                <div className='flex flex-row justify-center items-center'>
                                                    <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 56, height: 56 }}></Avatar>
                                                </div>
                                            </div>


                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text">Request title</span>
                                                </label>
                                                <input type="text" placeholder="Your request message to admin" className="input input-bordered" {...register('title', { required: true })} />
                                                {
                                                    errors.title?.type === 'required' && <span className='text-red-600'>Required</span>
                                                }
                                            </div>

                                            <div>
                                                <Box sx={{ minWidth: 120, marginTop: 3 }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="Experience-label">Experience</InputLabel>
                                                        <Select
                                                            value={experience}
                                                            labelId="Experience-label"
                                                            label="Experience"
                                                            onChange={handleExperienceChange}
                                                        >
                                                            <MenuItem value={'Beginner'}>Beginner</MenuItem>
                                                            <MenuItem value={'Experienced'}>Experienced</MenuItem>
                                                            <MenuItem value={'Some Idea'}>Some Idea</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </div>

                                            <div>
                                                <Box sx={{ minWidth: 120, marginTop: 3 }}>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="Category-label">Category</InputLabel>
                                                        <Select
                                                            value={category}
                                                            labelId="Category-label"
                                                            label="Category"
                                                            onChange={handleCategoryChange}
                                                        >
                                                            <MenuItem value={'Web Development'}>Web Development</MenuItem>
                                                            <MenuItem value={'Ethical Hacking'}>Ethical Hacking</MenuItem>
                                                            <MenuItem value={'Digital Marketing'}>Digital Marketing</MenuItem>
                                                            <MenuItem value={'Game Development'}>Game Development</MenuItem>
                                                            <MenuItem value={'Software Development'}>Software Development</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                </Box>

                                            </div>

                                            <div className="form-control mt-6">
                                                {
                                                    isPending &&
                                                    <div className='flex flex-row justify-center items-center'>
                                                        <Button className='w-full' isProcessing>Submitting</Button>
                                                    </div>
                                                }
                                                {
                                                    isSuccess &&
                                                    <div className='flex flex-row justify-center items-center'>
                                                        <Button className='w-full' disabled>Submitted Wait for Admin</Button>
                                                    </div>
                                                }
                                                {
                                                    isIdle &&
                                                    <div className='flex flex-row justify-center items-center'>
                                                        <Tooltip title="Submit for review" placement='top-end' arrow>
                                                            <Button className='w-full' type='submit'>Submit for review</Button>
                                                        </Tooltip>
                                                    </div>
                                                }

                                            </div>
                                        </form>
                                        :
                                        <div>
                                            {
                                                teachrequest.data.data.status === 'approved' &&
                                                <div>
                                                    <CardContent>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Rquest title</span>
                                                            </label>
                                                            <input type="text" value={teachrequest.data?.data?.title} className="input input-bordered" disabled />
                                                        </div>

                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Request experience</span>
                                                            </label>
                                                            <input type="text" value={teachrequest.data?.data?.experience} className="input input-bordered" disabled />
                                                        </div>

                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Request category</span>
                                                            </label>
                                                            <input type="text" value={teachrequest.data?.data?.category} className="input input-bordered" disabled />
                                                        </div>


                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Rquest status</span>
                                                            </label>
                                                            <span className='font-bold text-xl'>{teachrequest.data?.data?.status}</span>
                                                        </div>

                                                    </CardContent>
                                                    <CardActions>
                                                        <NavLink to={'/dashboard'}>
                                                            <Button className='w-full'>Go to dashboard</Button>
                                                        </NavLink>
                                                    </CardActions>
                                                </div>
                                            }
                                            {
                                                teachrequest.data.data.status === 'rejected' &&
                                                <form className="card-body" onSubmit={handleSubmit(handleSubmitForReview)}>
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Teacher name</span>
                                                        </label>
                                                        <input type="text" value={user?.displayName} className="input input-bordered" disabled />
                                                    </div>

                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Teacher mage</span>
                                                        </label>
                                                        <div className='flex flex-row justify-center items-center'>
                                                            <Avatar alt={user?.displayName} src={user?.photoURL} sx={{ width: 56, height: 56 }}></Avatar>
                                                        </div>
                                                    </div>


                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text">Request title</span>
                                                        </label>
                                                        <input type="text" placeholder="Your request message to admin" className="input input-bordered" {...register('title', { required: true })} />
                                                        {
                                                            errors.title?.type === 'required' && <span className='text-red-600'>Required</span>
                                                        }
                                                    </div>

                                                    <div>
                                                        <Box sx={{ minWidth: 120, marginTop: 3 }}>
                                                            <FormControl fullWidth>
                                                                <InputLabel id="Experience-label">Experience</InputLabel>
                                                                <Select
                                                                    value={experience}
                                                                    labelId="Experience-label"
                                                                    label="Experience"
                                                                    onChange={handleExperienceChange}
                                                                >
                                                                    <MenuItem value={'Beginner'}>Beginner</MenuItem>
                                                                    <MenuItem value={'Experienced'}>Experienced</MenuItem>
                                                                    <MenuItem value={'SomeIdea'}>Some Idea</MenuItem>
                                                                </Select>
                                                               
                                                            </FormControl>
                                                        </Box>
                                                    </div>

                                                    <div>
                                                        <Box sx={{ minWidth: 120, marginTop: 3 }}>
                                                            <FormControl fullWidth>
                                                                <InputLabel id="Category-label">Category</InputLabel>
                                                                <Select
                                                                    value={category}
                                                                    labelId="Category-label"
                                                                    label="Category"
                                                                    onChange={handleCategoryChange}

                                                                >
                                                                    <MenuItem value={'Web Development'}>Web Development</MenuItem>
                                                                    <MenuItem value={'Ethical Hacking'}>Ethical Hacking</MenuItem>
                                                                    <MenuItem value={'Digital Marketing'}>Digital Marketing</MenuItem>
                                                                    <MenuItem value={'Game Development'}>Game Development</MenuItem>
                                                                    <MenuItem value={'Software Development'}>Software Development</MenuItem>
                                                                </Select>
                                                               
                                                            </FormControl>
                                                        </Box>
                                                    </div>

                                                    <div className="form-control mt-6">
                                                        {
                                                            isPending &&
                                                            <div className='flex flex-row justify-center items-center'>
                                                                <Button className='w-full' isProcessing >Submitting</Button>
                                                            </div>
                                                        }
                                                        {
                                                            isSuccess &&
                                                            <div className='flex flex-row justify-center items-center'>
                                                                <Button className='w-full' disabled>Submitted Wait for Admin</Button>
                                                            </div>
                                                        }
                                                        {
                                                            isIdle &&
                                                            <div className='flex flex-row justify-center items-center'>
                                                                <Tooltip title="Submit for review" placement='top-end' arrow>
                                                                    <Button className='w-full'>Request to another</Button>
                                                                </Tooltip>
                                                            </div>
                                                        }

                                                    </div>
                                                </form>
                                            }
                                            {
                                                teachrequest.data.data.status === 'pending' &&
                                                <div>
                                                    <CardContent>
                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Request title</span>
                                                            </label>
                                                            <input type="text" value={teachrequest.data.data.title} className="input input-bordered" disabled />
                                                        </div>

                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Request experience</span>
                                                            </label>
                                                            <input type="text" value={teachrequest.data.data.experience} className="input input-bordered" disabled />
                                                        </div>

                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Request category</span>
                                                            </label>
                                                            <input type="text" value={teachrequest.data.data.category} className="input input-bordered" disabled />
                                                        </div>


                                                        <div className="form-control">
                                                            <label className="label">
                                                                <span className="label-text">Rquest status</span>
                                                            </label>
                                                            <span className='font-bold text-xl'>{teachrequest.data.data.status}</span>
                                                        </div>

                                                    </CardContent>
                                                    <CardActions>
                                                        <Button className='w-full' disabled>Wait for review</Button>
                                                    </CardActions>
                                                </div>
                                            }
                                        </div>
                                }
                            </div>
                        }
                    </div>
                }

            </div>
        </div>
    )
}

export default BecomeTeacherRequest