import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { isCapitalLetterPresentInPassword, isPasswordLengthEnough, isSpecialCharacterPresentInPassword } from '../../Utilities/Utilities'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';
import useAxios from '../../Hooks/useAxios';
import { Player } from '@lottiefiles/react-lottie-player';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

function RegistrationPage() {
    const { createNewUser, signInWithGoogleAccount, changeExitingUsersNameAndPhotoURL, signOutUser } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { handleSubmit, register, getValues, formState: { errors } } = useForm();
    const instance = useAxios();

    const tokenMutation = useMutation({
        mutationKey: ['token'],
        mutationFn: (data) => {
            return instance.post('/api/v1/token', data);
        },
        onSuccess: (data) => {
            localStorage.setItem('access-token', data.data.ACCESS_TOKEN);
        },
        onError: (error) => {
            toast.error(`${error}`, {
                position: 'bottom-center',
                autoClose: 5000
            });
        }
    });

    const googleSigninMutation = useMutation({
        mutationKey: ['googleSignin'],
        mutationFn: () => {
            return signInWithGoogleAccount();
        },
        onSuccess: (data) => {
            const name = data.user.displayName;
            const email = data.user.email;
            const uid = data.user.uid;
            const photo_url = data.user.photoURL;
            const fortoken = { email, uid };
            const user = { name, role: 'student', photo_url, email };
            tokenMutation.mutate(fortoken);
            addNewGoogleUserMutation.mutate(user);

        },
        onError: (error) => {
            toast.error(`${error}`, {
                position: 'bottom-center',
                autoClose: 5000
            });
        }
    });

    const newUserRegistrationMutation = useMutation({
        mutationKey: ['newUserRegistration'],
        mutationFn: (data) => {
            return createNewUser(data.email, data.password);
        },
        onSuccess: (data) => {
            const email = data.user.email;
            const uid = data.user.uid;
            const fortoken = { email, uid };
            const name = getValues('name');
            const photolink = getValues('photolink');
            const forName = { name, photolink };
            tokenMutation.mutate(fortoken);
            updateNamePhotoMutation.mutate(forName);
        },
        onError: (error) => {
            toast.error(`${error}`, {
                position: 'bottom-center',
                autoClose: 5000
            });
        }
    });

    const updateNamePhotoMutation = useMutation({
        mutationKey: ['updateUser'],
        mutationFn: (data) => {
            return changeExitingUsersNameAndPhotoURL(data.name, data.photolink);
        },
        onSuccess: (data) => {
            addNewUserIntoDbMutation.mutate();
        },
        onError: (error) => {
            toast.error(`${error}`, {
                position: 'bottom-center',
                autoClose: 5000
            });
        }
    });

    const addNewUserIntoDbMutation = useMutation({
        mutationKey: ['addnewuser'],
        mutationFn: () => {
            const email = getValues('email');
            const name = getValues('name');
            const photolink = getValues('photolink');
            const user = { name, role: 'student', photo_url: photolink, email };
            return instance.post('/user', user);
        },
        onSuccess: (data) => {
            navigate('/dashboard/profile');
            toast.success(`New user registration successful Done`, {
                autoClose: 2000,
                position: 'bottom-right'
            });
        }
    });

    const addNewGoogleUserMutation = useMutation({
        mutationKey: ['addnewgoogleuser'],
        mutationFn: (data) => {
            return instance.post('/user', data);
        },
        onSuccess: (data) => {
            navigate('/dashboard/profile');
            toast.success(`New Google user registration successful`, {
                autoClose: 2000,
                position: 'bottom-right'
            });
        }
    });


    const handleGoogleSignInEvent = (event) => {
        googleSigninMutation.mutate();
    }


    const handleRegistrationEvent = (event) => {
        const password = getValues('password');
        const email = getValues('email');
        const name = getValues('name');
        const photolink = getValues('photolink');
        const user = { email, password };
        newUserRegistrationMutation.mutate(user);
    };

    return (
        <div className='flex flex-col md:flex-row justify-center items-center gap-5 m-5'>
            <div className='md:w-1/2'>
                <Player autoplay loop src={'/lotties/registration.json'} style={{ height: '300px', width: '300px' }}></Player>
            </div>
            <div className="hero min-h-full md:w-1/2">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit(handleRegistrationEvent)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Your Email ID" className="input input-bordered" {...register('email', { required: true })} />
                            {
                                errors.email?.type === 'required' && <span className='text-red-600'>Required</span>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Your Password (Must have at least one capital and special character" className="input input-bordered" {...register('password', { pattern: /[^a-zA-Z0-9\s]/g, minLength: 6 })} />
                            {
                                errors.password?.type === 'minLength' && <span className='text-red-600'>Minimum password length is 6</span>
                            }
                            {
                                errors.password?.type === 'pattern' && <span className='text-red-600'>Must have at least one special character</span>
                            }
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Your username" className="input input-bordered" {...register('name')} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" placeholder="Your photo URL" className="input input-bordered" {...register('photolink', { pattern: /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/ })} />
                            {
                                errors.photolink?.type === 'pattern' && <span className='text-red-600'>Please input valid url</span>
                            }
                        </div>

                        <div className='flex flex-col justify-center items-center p-4'>
                            <h1 className='font-semibold pb-4'>Sign in by Google instead?</h1>
                            {
                                googleSigninMutation.isIdle &&
                                <div>
                                    <FcGoogle size={'64'} onClick={handleGoogleSignInEvent}></FcGoogle>
                                </div>
                            }
                            {
                                googleSigninMutation.isPending &&
                                <div>
                                    <CircularProgress />
                                </div>
                            }
                            {
                                googleSigninMutation.isSuccess &&
                                <div>
                                    <FcGoogle size={'64'} onClick={handleGoogleSignInEvent}></FcGoogle>
                                </div>
                            }
                            {
                                googleSigninMutation.isError &&
                                <div className='flex flex-col justify-center items-center'>
                                    <ErrorOutlineIcon />
                                    <h1>Something went wrong Please try later</h1>
                                </div>
                            }
                        </div>
                        {
                            newUserRegistrationMutation.isIdle &&
                            <div className="form-control mt-6">
                                <button className="btn btn-primary" type='submit'>REGISTER</button>
                            </div>
                        }
                        {
                            newUserRegistrationMutation.isPending &&
                            <div className='flex flex-row justify-center items-center'>
                                <CircularProgress />
                            </div>
                        }

                        {
                            newUserRegistrationMutation.isSuccess &&
                            <div className='flex flex-row justify-center items-center'>
                                <button className="btn btn-primary" disabled>Registration Complete</button>
                            </div>
                        }

                        <div className='flex flex-col justify-center items-center'>
                            <h1>Allready have account?</h1>
                            <Link to={'/signin'}><h1 className='text-green-600'>Login</h1></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default RegistrationPage