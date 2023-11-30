import React from 'react'
import useLoggedinUser from '../../../../Hooks/useLoggedinUser'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

function EnrollClassesPage() {
  const user = useLoggedinUser();
  const instance = useAxiosSecure();

  const payQuery = useQuery({
    queryKey: ['payment'],
    queryFn: () => {
      return instance.get(`/paymentinfo?id=${user.email}`);
    }
  });

  if (payQuery.isSuccess) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-3">
        {
          payQuery.data.data.map(
            (value, index) =>
              <Card sx={{ maxWidth: 345 }} key={index}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={value.class_image}
                  title={value.class_title}
                />

                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    {value.class_title}
                  </Typography>
                  <Typography variant="h5">Teacher: {value.class_name}</Typography>
                </CardContent>

                <CardActions className="flex flex-row justify-center items-center">
                  <NavLink to={`/class/${value.class_id}`}>
                    <Button className="w-full" variant="contained">Continue</Button>
                  </NavLink>
                </CardActions>
              </Card>
          )
        }
      </div>
    )
  }

}

export default EnrollClassesPage