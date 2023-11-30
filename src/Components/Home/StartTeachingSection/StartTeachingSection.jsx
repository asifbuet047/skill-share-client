import useAxios from '../../../Hooks/useAxios'
import { useQuery } from '@tanstack/react-query';
import { ClockLoader } from 'react-spinners';
import { Button, CardMedia } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function StartTeachingSection() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-row justify-center items-center border-4 gap-3 border-green-500 rounded-lg p-5 mt-2 mb-2'>
      <Card sx={{ minWidth: 275, maxHeight: 275 }}>
        <div className='flex flex-row'>
          <CardMedia

            component="img"
            sx={{ width: 151 }}
            image="/images/teacher.svg"
            alt="Teacher"
          />
          <CardContent>
            <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
              Become s instructor
            </Typography>
            <Typography variant="h6" component="div">
              Transforming lives, one lesson at a time. Become a teacher and sculpt the future. Your passion ignites knowledge, and your dedication shapes tomorrow. Embrace the profound impact only a teacher can make. Happy teaching
            </Typography>
            <Button variant='contained' onClick={() => {
              navigate('/becomeateacher')
            }}>Start Teaching Today</Button>
          </CardContent>
        </div>
      </Card>
    </div>
  );

}

export default StartTeachingSection