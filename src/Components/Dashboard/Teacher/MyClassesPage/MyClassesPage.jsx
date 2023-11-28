import { useQuery } from "@tanstack/react-query";
import useLoggedinUser from "../../../../Hooks/useLoggedinUser";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import ClockLoading from "../../../DataLoadingComponents/ClockLoading";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";


function MyClassesPage() {
  const user = useLoggedinUser();
  const instance = useAxiosSecure();
  const navigate = useNavigate();
  const { data, isFetching, isSuccess, error } = useQuery({
    queryKey: ['myclass', user?.email],
    queryFn: async () => {
      return instance.get(`/myclass?id=${user?.email}`);
    }
  });


  if (isFetching) {
    return (
      <div className="w-full flex flex-row justify-center items-center">
        <ClockLoading></ClockLoading>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-3">
        {
          data?.data?.map((value, index) => <Card sx={{ maxWidth: 345 }} key={index}>
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
              <Typography variant="h5">Status: {value.status}</Typography>
            </CardContent>
            <CardActions className="flex flex-row justify-center items-center">
              <Button size="small" variant="contained" onClick={() => {
                navigate(`/dashboard/updateclass/${value._id}`)
              }}>Update</Button>
              <Button size="small" variant="contained">Delete</Button>
              <Button size="small" variant="contained">See Details</Button>
            </CardActions>
          </Card>)
        }

      </div>
    )
  }
}

export default MyClassesPage