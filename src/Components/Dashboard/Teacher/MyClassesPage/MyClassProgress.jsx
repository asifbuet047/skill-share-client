import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';

function MyClassProgress() {
    const classId = useParams();
    const instance = useAxiosSecure();

    const { data, isSuccess, isFetching, isError } = useQuery({
        queryKey: ['classesProgress'],
        queryFn: () => {
            return instance.get(`/classDetails/${classId.id}`);
        }
    });

    if (isSuccess) {
        return (
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 m-3'>
                <Card sx={{ maxWidth: 345 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            {data.data.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Description: {data.data.description}
                        </Typography>
                        <Typography variant="h5">Totalenroll: {data.data.enroll} students</Typography>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default MyClassProgress