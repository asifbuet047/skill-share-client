import useAxios from '../../../Hooks/useAxios'
import { useQuery } from '@tanstack/react-query';
import { ClockLoader } from 'react-spinners';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';


function StaticsSection() {
  const instance = useAxios();
  const totalUser = useQuery({
    queryKey: ['totaluser'],
    queryFn: () => {
      return instance.get('/totalusercount');
    }
  });
  const totalClasses = useQuery({
    queryKey: ['totalclasses'],
    queryFn: () => {
      return instance.get('/totalclasscount');
    }
  });
  const totalEnroll = useQuery({
    queryKey: ['totalenroll'],
    queryFn: () => {
      return instance.get('/totalenrollcount');
    }
  });

  if (totalClasses.isSuccess) {
    if (totalUser.isSuccess) {
      if (totalEnroll.isSuccess) {
        return (
          <div className='flex flex-row justify-center items-center border-4 gap-3 border-green-500 rounded-lg p-5 mt-2 mb-2'>
            <Card sx={{ minWidth: 275, maxHeight: 275 }}>
              <div className='flex flex-row'>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total User
                  </Typography>
                  <Typography variant="h5" component="div">
                    {
                      totalUser.data.data.totalUser
                    }
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image="/images/banner_1.svg"
                  alt="Live from space album cover"
                />
              </div>
            </Card>

            <Card sx={{ minWidth: 275, maxHeight: 275 }}>
              <div className='flex flex-row'>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total Classes
                  </Typography>
                  <Typography variant="h5" component="div">
                    {
                      totalClasses.data.data.totalClass
                    }
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image="/images/banner_2.svg"
                  alt="Live from space album cover"
                />
              </div>
            </Card>

            <Card sx={{ minWidth: 275, maxHeight: 275 }}>
              <div className='flex flex-row'>
                <CardContent>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Total Enroll
                  </Typography>
                  <Typography variant="h5" component="div">
                    {
                      totalEnroll.data.data.total
                    }
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image="/images/banner_1.svg"
                  alt="Live from space album cover"
                />
              </div>
            </Card>

          </div>
        );
      } else {
        return (
          <div>
            <ClockLoader></ClockLoader>
          </div>
        );
      }
    } else {
      return (
        <div>
          <ClockLoader></ClockLoader>
        </div>
      );
    }
  } else {
    return (
      <div>
        <ClockLoader></ClockLoader>
      </div>
    );
  }

}

export default StaticsSection