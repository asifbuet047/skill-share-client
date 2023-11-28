import React from 'react'
import { useForm } from 'react-hook-form';
import useLoggedinUser from '../../Hooks/useLoggedinUser';
import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function BecomeTeacherRequest() {
    const user = useLoggedinUser();
    const { handleSubmit, register, getValues, formState: { errors } } = useForm();

    const handleSubmitForReview = () => {

    }

    const handleExperienceChange = (event) => {
        console.log(event.target.value);
    }

    const handleCategoryChange = (event) => {
        console.log(event.target.value);

    }

    return (
        <div className="flex flex-row justify-center items-center">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                {
                    user &&
                    <form className="card-body" onSubmit={handleSubmit(handleSubmitForReview)}>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Teacher name</span>
                            </label>
                            <input type="text" value={user.displayName} className="input input-bordered" {...register('name')} disabled />
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
                            <input type="email" placeholder="Your request message to admin" className="input input-bordered" {...register('title', { required: true })} />
                            {
                                errors.title?.type === 'required' && <span className='text-red-600'>Required</span>
                            }
                        </div>

                        <div>
                            <Box sx={{ minWidth: 120, marginTop: 3 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="Experience-label">Experience</InputLabel>
                                    <Select
                                        labelId="Experience-label"
                                        label="Experience"
                                        onChange={handleExperienceChange}
                                    >
                                        <MenuItem value={'Teacher'}>Beginner</MenuItem>
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
                            <Button variant="contained" type="submit" >Submit for review</Button>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
}

export default BecomeTeacherRequest