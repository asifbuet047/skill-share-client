import { useMutation, useQuery } from "@tanstack/react-query";
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
import { Modal } from "flowbite-react";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';



function MyClassesPage() {
  const user = useLoggedinUser();
  const instance = useAxiosSecure();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [classId, setClassId] = useState(null);


  const { data, isFetching, isSuccess, error } = useQuery({
    queryKey: ['myclass', user?.email],
    queryFn: async () => {
      return instance.get(`/myclass?id=${user?.email}`);
    }
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      console.log(data);
      return instance.delete(`/deleteclass/${data}`);
    },
    
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
              <Button size="small" variant="contained" onClick={() => { setClassId(value._id); setOpenModal(true) }}>Delete</Button>
              <Button size="small" variant="contained">See Details</Button>
            </CardActions>
          </Card>)
        }

        <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              {
                mutation.isPending &&
                <div>
                  <CircularProgress />
                  <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Class is deleting from database...
                  </h1>
                </div>
              }
              {
                mutation.isSuccess &&
                <div>
                  <CheckIcon />
                  <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Class is sucessfully deleted. Thanks
                  </h1>
                  <Button variant="contained" onClick={() => setOpenModal(false)}>Ok</Button>
                </div>
              }
              {
                mutation.isIdle &&
                <div>
                  <MdDeleteForever className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h1 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete Your class?
                  </h1>
                  <div className="flex justify-center gap-4">
                    <Button variant="outlined" onClick={() => {
                      console.log(classId);
                      mutation.mutate(classId);
                    }}>
                      {"Yes, I'm sure"}
                    </Button>
                    <Button variant="outlined" onClick={() => setOpenModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              }
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default MyClassesPage