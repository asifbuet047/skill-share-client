import React from 'react'
import useAxios from '../../../Hooks/useAxios'
import { useQuery } from '@tanstack/react-query';
import { ClockLoader } from 'react-spinners';
import { Avatar } from 'flowbite-react';

function PopularClassesSection() {
  const instance = useAxios();
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ['popular'],
    queryFn: () => {
      return instance.get('/allpopularclass');
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
              <Avatar img={value.image}></Avatar>
              <h1><span className='text-center'>{value.title}</span></h1>
              <h1>Enroll: {value.enroll}</h1>
              <h1>Teacher: {value.name}</h1>
            </div>
          )
        }
      </div>
    );
  }
}

export default PopularClassesSection