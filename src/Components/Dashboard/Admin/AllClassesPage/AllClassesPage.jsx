import React, { useState } from 'react'
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ClockLoading from '../../../DataLoadingComponents/ClockLoading';
import { useNavigate } from 'react-router-dom';


function AllClassesPage() {
  const instance = useAxiosSecure();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);

  const queryClient = useQueryClient();

  const allClassesQuery = useQuery({
    queryKey: ['allclass'],
    queryFn: () => {
      return instance.get('/allclasses');
    }
  });

  const approveStatusOfClassMutation = useMutation({
    mutationFn: (data) => {
      return instance.patch('/editclass', data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('allclass');
    }
  });

  const rejectStatusOfClassMutation = useMutation({
    mutationFn: (data) => {
      return instance.patch('/editclass', data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('allclass');
    }
  });

  if (allClassesQuery.isFetching) {
    return (
      <div className='w-full h-full flex flex-row justify-center items-center'>
        <ClockLoading></ClockLoading>
      </div>
    );
  }

  if (allClassesQuery.isError) {
    return (
      <div>
        <Typography variant='h3' >Something wrong in server Try later</Typography>
      </div>
    );
  }


  if (allClassesQuery.isSuccess) {
    if (allClassesQuery.data.data?.noclass) {
      return (
        <div>
          <Typography variant='h3' color={'black'}>No one add class</Typography>
        </div>
      );
    } else {
      return (
        <div>
          <TableContainer sx={{ width: 1 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Approve</TableCell>
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Reject</TableCell>
                  <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>See progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  allClassesQuery.data.data.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" sx={{ border: 1 }}>{row.title}</TableCell>
                      <TableCell align="center" sx={{ border: 1 }}>{row.email}</TableCell>
                      <TableCell align="center" sx={{ border: 1 }}>{row.description}</TableCell>
                      <TableCell align="center" sx={{ border: 1 }}>{row.status}</TableCell>

                      {
                        approveStatusOfClassMutation.isPending &&
                        <TableCell align="center" sx={{ border: 1 }}><Button variant='contained'>Approving...</Button></TableCell>
                      }
                      {
                        approveStatusOfClassMutation.isIdle &&
                        <TableCell align="center" sx={{ border: 1 }}>
                          {
                            row.status === 'pending' ?
                              <Button variant='contained' onClick={() => {
                                const data = { id: row._id, status: 'approved' };
                                setEmail(row.email);
                                console.log(data);
                                approveStatusOfClassMutation.mutate(data);
                              }}>Approve</Button>
                              :
                              <Button variant='contained' disabled>Approve</Button>
                          }
                        </TableCell>
                      }
                      {
                        approveStatusOfClassMutation.isSuccess &&
                        <TableCell align="center" sx={{ border: 1 }}><Button variant='contained' disabled>Approve</Button></TableCell>
                      }



                      {
                        rejectStatusOfClassMutation.isPending &&
                        <TableCell align="center" sx={{ border: 1 }}><Button variant='contained'>Rejecting...</Button></TableCell>
                      }
                      {
                        rejectStatusOfClassMutation.isIdle &&
                        <TableCell align="center" sx={{ border: 1 }}>
                          {
                            row.status === 'pending' ?
                              <Button variant='contained' onClick={() => {
                                const data = { id: row._id, status: 'rejected' };
                                rejectStatusOfClassMutation.mutate(data);
                              }}>Reject</Button>
                              :
                              <Button variant='contained' disabled>Reject</Button>
                          }
                        </TableCell>
                      }
                      {
                        rejectStatusOfClassMutation.isSuccess &&
                        <TableCell align="center" sx={{ border: 1 }}><Button variant='contained' disabled>Reject</Button></TableCell>
                      }
                      {
                        row.status === 'approved' ?
                          <TableCell align="center" sx={{ border: 1 }}><Button variant='contained' onClick={() => {
                            console.log(row._id);
                            navigate(`/dashboard/feedback/${row._id}`);
                          }}>See progress</Button></TableCell>
                          :
                          <TableCell align="center" sx={{ border: 1 }}><Button variant='contained' disabled>See progress</Button></TableCell>
                      }
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

}

export default AllClassesPage