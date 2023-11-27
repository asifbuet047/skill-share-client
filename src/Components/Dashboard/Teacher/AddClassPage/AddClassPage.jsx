import { useForm } from "react-hook-form"

import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import useLoggedinUser from "../../../../Hooks/useLoggedinUser";
import { Player } from "@lottiefiles/react-lottie-player";
import { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import CheckIcon from '@mui/icons-material/Check';

function AddClassPage() {
  const user = useLoggedinUser();
  const instance = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);
  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      if (data) {
        return instance.post('/addclass', data);
      }
    }
  });
  const { handleSubmit, register, getValues, formState: { errors } } = useForm();

  const handleAddClassEvent = (event) => {

    setOpenModal(true);
  }

  return (
    <div className='flex flex-col md:flex-row justify-center items-center gap-5 m-5'>
      <div className='md:w-1/2'>
        <Player autoplay loop src={'/lotties/class.json'} style={{ height: '300px', width: '300px' }}></Player>
      </div>
      <div className="hero min-h-full md:w-1/2">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          {
            user &&
            <form className="card-body" onSubmit={handleSubmit(handleAddClassEvent)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Class Title</span>
                </label>
                <input type="text" placeholder="title of Your class" className="input input-bordered" {...register('title', { required: true })} />
                {
                  errors.title?.type === 'required' && <span className='text-red-600'>Required</span>
                }
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Teacher name</span>
                </label>
                <input type="text" value={user.displayName} className="input input-bordered" {...register('name')} />

              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" value={user.email} className="input input-bordered" {...register('email')} />

              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input type="number" placeholder="Your class price" className="input input-bordered" {...register('price', { required: true })} />
                {
                  errors.price?.type === 'required' && <span className='text-red-600'>Required</span>
                }
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input type="text" placeholder="Your class dexcription" className="input input-bordered" {...register('description', { required: true })} />
                {
                  errors.description?.type === 'required' && <span className='text-red-600'>Required</span>
                }
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input type="text" placeholder="Relevant image url" className="input input-bordered" {...register('image', { pattern: /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/ })} />
                {
                  errors.image?.type === 'pattern' && <span className='text-red-600'>Must be valid URL</span>
                }
              </div>

              <div className="form-control mt-6">
                <Button variant="contained" type="submit" endIcon={<AddIcon />}>Add Class</Button>
              </div>
            </form>

          }

        </div>
      </div>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {
              mutation.isPending &&
              <div>
                <CircularProgress />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Class is adding into database...
                </h3>
              </div>
            }
            {
              mutation.isSuccess &&
              <div>
                <CheckIcon />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Class is sucessfully added. Thanks
                </h3>
                <Button variant="contained" onClick={() => setOpenModal(false)}>Ok</Button>
              </div>
            }
            {
              mutation.isIdle &&
              <div>
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to add this class?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button variant="outlined" onClick={() => {
                    const details = { ...getValues(), status: 'pending' };
                    mutation.mutate(details);
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

export default AddClassPage