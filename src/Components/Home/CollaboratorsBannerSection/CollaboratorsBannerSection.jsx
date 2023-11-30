import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxios from '../../../Hooks/useAxios';
import { Avatar, AvatarGroup } from '@mui/material';
import { ClockLoader } from 'react-spinners';
import { Carousel } from 'flowbite-react'

function CollaboratorsBannerSection() {

  const instance = useAxios()
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['partners'],
    queryFn: () => {
      return instance.get('/partners');
    }
  });


  if (isFetching) {
    return (
      <div>
        <ClockLoader></ClockLoader>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className='flex flex-row w-full justify-center border-4 border-green-500 rounded-lg p-5 mt-2 mb-2'>
        {
          data?.data?.map((value, index) =>
            <div className='flex flex-col ml-4 mr-4 justify-center items-center'>
              <Avatar src={value.logo}></Avatar>
              <h1>{value.name}</h1>
              <h1>{value.description}</h1>
            </div>
          )
        }
      </div>
    );
  }

}

export default CollaboratorsBannerSection