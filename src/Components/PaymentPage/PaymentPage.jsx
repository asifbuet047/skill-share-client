import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const promiseStripe = loadStripe(import.meta.env.VITE_Payment_PK);
function PaymentPage() {
    const id = useParams();
    const instance = useAxiosSecure();
    const { data, isSuccess, isFetching } = useQuery({
        queryKey: ['class'],
        queryFn: () => {
            return instance.get(`/classDetails/${id.id}`);
        }
    });


    if (isSuccess) {
        return (
            <div>
                <div className='flex flex-row justify-center items-center'>
                    <h1 className='text-3xl'>Please Pay for {data.data.price} for class</h1>
                </div>
                <Elements stripe={promiseStripe}>
                    <CheckoutForm data={id} price={data.data.price}></CheckoutForm>
                </Elements>
            </div>
        )
    }

    if (isFetching) {
        return (
            <div>
                Fetching
            </div>
        );
    }

}

export default PaymentPage