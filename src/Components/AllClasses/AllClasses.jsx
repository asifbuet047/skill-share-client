import React from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import useLoggedinUser from '../../Hooks/useLoggedinUser';
import { useQuery } from '@tanstack/react-query';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink, useNavigate } from 'react-router-dom';
import ClockLoading from '../DataLoadingComponents/ClockLoading';

function AllClasses() {
    const instance = useAxiosSecure();
    const user = useLoggedinUser();
    const navigate = useNavigate();

    const { data, isFetching, isSuccess, error } = useQuery({
        queryKey: ['allclass'],
        queryFn: () => {
            return instance.get('/allclass');
        }
    });

    if (isFetching) {
        return (
            <div className="w-full flex flex-row justify-center items-center">
                <ClockLoading></ClockLoading>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                Mutation fetch error
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border-4 border-green-500 rounded-lg">
                {
                    data?.data?.map(
                        (value, index) =>
                            <Card sx={{ maxWidth: 345 }} key={index}>
                                <CardMedia
                                    sx={{ height: 140 }}
                                    image={value.image}
                                    title={value.title}
                                />

                                <CardContent>
                                    <Typography gutterBottom variant="h3" component="div">
                                        {value.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Description: {value.description}
                                    </Typography>
                                    <Typography variant="h5">Price: {value.price}</Typography>
                                    <Typography variant="h5">Teacher: {value.name}</Typography>
                                    <Typography variant="h5">Total enrollment: {value.enroll}</Typography>
                                </CardContent>

                                <CardActions className="flex flex-row justify-center items-center">
                                    <NavLink to={`/class/${value._id}`}>
                                        <Button className="w-full" variant="contained">Enroll</Button>
                                    </NavLink>
                                </CardActions>
                            </Card>
                    )
                }
            </div>
        )
    }
}

export default AllClasses