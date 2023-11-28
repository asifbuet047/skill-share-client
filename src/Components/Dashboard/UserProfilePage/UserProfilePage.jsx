import React from 'react'
import useGetCurrentUser from '../../../Hooks/useGetCurrentUser'
import ClockLoading from '../../DataLoadingComponents/ClockLoading';
import useLoggedinUser from '../../../Hooks/useLoggedinUser';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Avatar, Typography } from '@mui/material';

function UserProfilePage() {
  const currentUser = useLoggedinUser();
  console.log(currentUser);
  const instance = useAxiosSecure();
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['currentuser'],
    queryFn: () => {
      return instance.get(`/user?id=${currentUser.email}`);
    }
  });
  return (
    <div>
      {
        isFetching &&
        <div>
          <ClockLoading></ClockLoading>
        </div>
      }
      {
        isSuccess &&
        <div className='w-full h-fit flex flex-col md:flex-row bg-base-300 rounded-lg p-2'>
          <div className='w-1/2 text-2xl'>
            <h1>Name: {data.data.name}</h1>
            <h1>Role: {data.data.role}</h1>
            <h1>Email: {data.data.email}</h1>
            {
              data.data?.phone && <h1>Phone: {data.data?.phone}</h1>
            }

          </div>
          <div className='w-1/2 flex flex-row justify-center items-center'>
            <Avatar alt={data.data.name} src={data.data.photo_url} sx={{ width: 56, height: 56 }}></Avatar>
          </div>
        </div>
      }
    </div>
  );
}

export default UserProfilePage