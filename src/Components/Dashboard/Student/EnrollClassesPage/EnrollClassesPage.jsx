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
import { NavLink, useNavigate } from 'react-router-dom';

function EnrollClassesPage() {
  const user = useLoggedinUser();
  const instance = useAxiosSecure();
  const navigate = useNavigate();

  const payQuery = useQuery({
    queryKey: ['payment'],
    queryFn: () => {
      return instance.get(`/paymentinfo?id=${user.email}`);
    }
  });

  if (payQuery.isSuccess) {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 m-3">
        {
          payQuery.data.data.length > 0 ?
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
                    <NavLink to={`/dashboard/myenroll/${value._id}`}>
                      <Button className="w-full" variant="contained">Continue</Button>
                    </NavLink>
                  </CardActions>
                </Card>
            )
            :
            <div>
              <Card sx={{ maxWidth: 345 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {"You don't enroll in any class. Go to All class to see available classes"}
                  </Typography>
                </CardContent>
                <CardActions className="flex flex-row justify-center items-center">
                  <Button className="w-full" variant="contained" onClick={() => {
                    navigate(`/allclasses`);
                  }}>All Class</Button>
                </CardActions>
              </Card>
            </div>
        }
      </div>
    )
  }

}

export default EnrollClassesPage