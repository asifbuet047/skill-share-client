import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { isCapitalLetterPresentInPassword, isPasswordLengthEnough, isSpecialCharacterPresentInPassword } from '../../Utilities/Utilities'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Player } from '@lottiefiles/react-lottie-player';
import { useForm } from 'react-hook-form';


function RegistrationPage() {
    const { createNewUser, signInWithGoogleAccount, changeExitingUsersNameAndPhotoURL, signOutUser } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { handleSubmit, register, getValues } = useForm();
    const axiosSecureHook = useAxiosSecure();

    const handleGoogleSignIn = (event) => {
        signInWithGoogleAccount()
            .then((response) => {
                const user = response.user.uid;
                const mail = response.user.email;
                axiosSecureHook.post('/api/v1/token', { mail, user })
                    .then((response) => {
                        toast.success(`Successfully Logged In. Welcome ${mail}`, {
                            position: 'bottom-center',
                            autoClose: 2000,
                        });
                        navigate('/');
                    }).catch((error) => {
                        signOutUser();
                        toast.error(`Not valid User try later ${error}`, {
                            position: 'bottom-right',
                            autoClose: 5000,
                        });
                    })

                if (location.state === null) {
                    navigate('/');
                } else {
                    navigate(`${location.state}`);
                }
            })
            .catch((error) => {
                navigate('/');
                toast.error(`Something wrong ${error}`, {
                    position: 'bottom-right',
                    autoClose: 5000,
                });
            });
    }

    const handleRegistrationEvent = (event) => {
        const password = getValues('password');
        const mail = getValues('email');
        const name = getValues('name');
        const photolink = getValues('photolink');
        console.log(name, photolink, mail, password);

        // if (isSpecialCharacterPresentInPassword(password)) {
        //     if (isCapitalLetterPresentInPassword(password)) {
        //         if (isPasswordLengthEnough(password)) {
        //             createNewUser(mail, password)
        //                 .then((response) => {
        //                     const id = response.user.uid;
        //                     axiosSecureHook.post('/api/v1/token', { mail, id })
        //                         .then((response) => {
        //                             console.log(response);
        //                             changeExitingUsersNameAndPhotoURL(name, photolink)
        //                                 .then((response) => {
        //                                     toast.success(`New user is successfully created. Welcome`, {
        //                                         position: 'bottom-right',
        //                                         autoClose: 2000,
        //                                     });
        //                                 }).catch((error) => {
        //                                     console.log(error);
        //                                 });
        //                         }).catch((error) => {
        //                             signOutUser();
        //                             console.log(error);
        //                             toast.error(`Not valid User try later ${error}`, {
        //                                 position: 'bottom-right',
        //                                 autoClose: 3000,
        //                             });
        //                         })

        //                     if (location.state === null) {
        //                         navigate('/');
        //                     } else {
        //                         console.log(location.state);
        //                         navigate(`${location.state}`);
        //                     }
        //                 })
        //                 .catch((error) => {
        //                     toast.error(error.message, {
        //                         position: 'bottom-right',
        //                         autoClose: '2000',
        //                         hideProgressBar: false,
        //                         newestOnTop: true,
        //                         closeOnClick: true,
        //                         draggable: false,
        //                         pauseOnHover: false,
        //                         theme: 'light'
        //                     });
        //                 })
        //         } else {
        //             toast.error('Password length should be at least 6 character', {
        //                 position: 'bottom-right',
        //                 autoClose: '2000',
        //                 hideProgressBar: false,
        //                 newestOnTop: true,
        //                 closeOnClick: true,
        //                 draggable: false,
        //                 pauseOnHover: false,
        //                 theme: 'light'
        //             });
        //         }
        //     } else {
        //         toast.error('Password should contain at least 1 capital character', {
        //             position: 'bottom-right',
        //             autoClose: '2000',
        //             hideProgressBar: false,
        //             newestOnTop: true,
        //             closeOnClick: true,
        //             draggable: false,
        //             pauseOnHover: false,
        //             theme: 'light'
        //         });
        //     }
        // } else {
        //     toast.error('Password should contain at least 1 special character', {
        //         position: 'bottom-right',
        //         autoClose: '2000',
        //         hideProgressBar: false,
        //         newestOnTop: true,
        //         closeOnClick: true,
        //         draggable: false,
        //         pauseOnHover: false,
        //         theme: 'light'
        //     });
        // }
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
                            <input type="email" placeholder="Your Email ID" className="input input-bordered" {...register('email')} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Your Password (Must have at least one capital and special character" className="input input-bordered" {...register('password')} />
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
                            <input type="text" placeholder="Your photo URL" className="input input-bordered" {...register('photolink')} />
                        </div>
                        <div className='flex flex-col justify-center items-center p-4'>
                            <h1 className='text-white font-semibold pb-4'>Sign in by Google instead?</h1>
                            <FcGoogle size={'64'} onClick={handleGoogleSignIn}></FcGoogle>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">REGISTER</button>
                        </div>
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