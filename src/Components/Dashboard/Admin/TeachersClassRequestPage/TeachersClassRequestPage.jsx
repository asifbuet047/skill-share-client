import React from 'react'
import useLoggedinUser from '../../../../Hooks/useLoggedinUser'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ClockLoading from '../../../DataLoadingComponents/ClockLoading';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

function TeachersClassRequestPage() {
  const user = useLoggedinUser();
  const instance = useAxiosSecure();
  const allRequestQuery = useQuery({
    queryKey: ['allclasses'],
    queryFn: () => {
      return instance.get('/allrequest');
    }
  });

  if (allRequestQuery.isFetching) {
    return (
      <div className='w-full h-full flex flex-row justify-center items-center'>
        <ClockLoading></ClockLoading>
      </div>
    );
  }

  function createData(name, image, experience, title, category, status) {
    return { name, image, experience, title, category, status };
  }



  if (allRequestQuery.isSuccess) {
    if (allRequestQuery.data.data?.norequest) {
      return (
        <div>
          <Typography variant='h3' color={'black'}>No one requested yet</Typography>
        </div>
      );
    } else {
      return (
        <div>
          <TableContainer sx={{ width: 1 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Experience</TableCell>
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Approve</TableCell>
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Reject</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  allRequestQuery.data.data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" sx={{ border: 1 }}>{row.name}</TableCell>
                      <TableCell align="center" sx={{ border: 1 }}>{row.experience}</TableCell>
                      <TableCell align="center" sx={{ border: 1 }}>{row.title}</TableCell>
                      <TableCell align="center" sx={{ border: 1 }}>{row.category}</TableCell>
                      <TableCell align="center" sx={{ border: 1 }}>{row.status}</TableCell>
                      <TableCell align="center" sx={{ border: 1 }}><Button variant='contained'>Approve</Button></TableCell>
                      <TableCell align="center" sx={{ border: 1 }}><Button variant='contained'>Reject</Button></TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      );
    }
  }

  if (allRequestQuery.isError) {
    return (
      <div>
        <Typography variant='h3' >Something wrong in server Try later</Typography>
      </div>
    );
  }

  return (
    <div>TeachersClassRequestPage</div>
  )
}

export default TeachersClassRequestPage