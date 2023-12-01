import { React, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Player } from '@lottiefiles/react-lottie-player'
import { useForm } from 'react-hook-form';
import useSignInWithMailPassHook from '../../Hooks/useAuth';
import { Button } from '@mui/material';
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider';
import { useMutation } from '@tanstack/react-query';
import useAxios from "../../Hooks/useAxios"


function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInUser, signOutUser } = useContext(AuthenticationContext);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const instance = useAxios();

  const getTokenMutation = useMutation({
    mutationKey: ['gettoken'],
    mutationFn: (data) => {
      return instance.post('/api/v1/token', data);
    },
    onSuccess: (data) => {
      localStorage.setItem('access-token', data.data.ACCESS_TOKEN);
      toast.success(`Successfully Logged In. Welcome`, {
        position: 'bottom-right',
        autoClose: 2000,
      });
      if (location.state === null) {
        navigate('/dashboard/profile');
      } else {
        navigate(`${location.state}`);
      }
    },
    onError: (error) => {
      signOutUser();
      toast.error(`Something wrong ${error}`, {
        position: 'bottom-center',
        autoClose: 5000,
      });
    }
  });


  const signInMutation = useMutation({
    mutationKey: ['getusergoogle'],
    mutationFn: (data) => {
      console.log(data);
      return signInUser(data.mail, data.password);
    },
    onSuccess: (data) => {
      const mail = data.user.email;
      const uid = data.user.uid;
      getTokenMutation.mutate({ mail, uid });
    },
    onError: (error) => {
      toast.error(`Something wrong ${error}`, {
        position: 'bottom-center',
        autoClose: 5000,
      });
    }
  });

  const handleSignInEvent = () => {
    const password = getValues('password');
    const mail = getValues('email');
    signInMutation.mutate({ mail, password });
  };



  return (
    <div className='flex flex-col md:flex-row justify-center items-center gap-5 m-5'>
      <div className='md:w-1/2'>
        <Player autoplay loop src={'/lotties/signin.json'} style={{ height: '300px', width: '300px' }}></Player>
      </div>
      <div className="hero min-h-full md:w-1/2">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(handleSignInEvent)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" {...register('email', { minLength: 10 })} />
              {
                errors.email?.type === 'minLength' && <span>Minimum 10 length</span>
              }
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" {...register('password')} />

            </div>
            <div className="form-control mt-6">
              <Button variant='contained' type='submit'>Signin</Button>
            </div>
            <div className='flex flex-col justify-center items-center'>
              <h1>Dont have account?</h1>
              <Link to={'/registration'} state={location.state}><h1 className='text-red-600'>Register</h1></Link>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

export default SignInPage