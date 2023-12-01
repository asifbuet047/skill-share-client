import React from 'react'
import { Avatar, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


export default function AllUsersPage() {
    const instance = useAxiosSecure();
    const queryClient = useQueryClient();
    const allUser = useQuery({
        queryKey: ['allUsers'],
        queryFn: () => {
            return instance.get('/alluser');
        }
    });

    const makeAdminMutation = useMutation({
        mutationFn: (data) => {
            const role = data.role;
            const id = data.id;
            return instance.patch(`/user?id=${id}`, { role });
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('allUsers');
        }
    });

    if (allUser.isSuccess) {
        return (
            <div>
                <TableContainer sx={{ width: 1 }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow >
                                <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>User name</TableCell>
                                <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>User mail</TableCell>
                                <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>User status</TableCell>
                                <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>User image</TableCell>
                                <TableCell align="center" sx={{ border: 1, fontWeight: 'bold' }}>Make admin</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                allUser.data.data.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center" sx={{ border: 1 }}>{row.name}</TableCell>
                                        <TableCell align="center" sx={{ border: 1 }}>{row.email}</TableCell>
                                        <TableCell align="center" sx={{ border: 1 }}>{row.role}</TableCell>
                                        <TableCell align="center" sx={{ border: 1 }}><Avatar src={row.photo_url} alt={row.name}></Avatar></TableCell>
                                        
                                        {
                                            makeAdminMutation.isPending &&
                                            <TableCell align="center" sx={{ border: 1 }}><Button variant='contained'>Approving...</Button></TableCell>
                                        }
                                        {
                                            makeAdminMutation.isIdle &&
                                            <TableCell align="center" sx={{ border: 1 }}>
                                                {
                                                    row.role !== 'admin' ?
                                                        <Button variant='contained' onClick={() => {
                                                            const data = { id: row._id, role: 'admin' };
                                                            console.log(data);
                                                            makeAdminMutation.mutate(data);
                                                        }}>Make Admin</Button>
                                                        :
                                                        <Button variant='contained' disabled>Make Admin</Button>
                                                }
                                            </TableCell>
                                        }
                                        {
                                            makeAdminMutation.isSuccess &&
                                            <TableCell align="center" sx={{ border: 1 }}><Button variant='contained' disabled>Make Admin</Button></TableCell>
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
