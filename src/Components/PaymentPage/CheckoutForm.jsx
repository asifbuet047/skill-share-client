import { async } from '@firebase/util'
import { Button } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useMutation, useQuery } from '@tanstack/react-query';
import useLoggedinUser from '../../Hooks/useLoggedinUser';
import ClockLoading from '../DataLoadingComponents/ClockLoading';
import { toast } from 'react-toastify';

function CheckoutForm({ data, price }) {
    const user = useLoggedinUser();
    const stripe = useStripe();
    const element = useElements();
    const instance = useAxiosSecure();
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [currentClass, setCurrentClass] = useState(null);

    const queryClass = useQuery({
        queryKey: ['queryclass'],
        queryFn: () => {
            return instance.get(`/classDetails/${data.id}`);
        }
    });


    useEffect(() => {
        instance.post('/create_payment_intent', { price: price }).then((response) => {
            console.log(response.data.clientSecret);
            setClientSecret(response.data.clientSecret);
        })
    }, [instance]);

    const { isPending, isIdle, isSuccess, mutate } = useMutation({
        mutationFn: (data) => {
            return instance.post('/payment', data);
        },
        onSuccess: (data) => {
            instance.patch('/editclassenroll', { id: queryClass.data.data._id, enroll: queryClass.data.data.enroll + 1 })
                .then((res) => {
                    toast.success('Successfully updated the database', {
                        position: 'bottom-center',
                        autoClose: 2000
                    });
                });
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !element) {
            return
        }
        const card = element.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.log(error);
        }

        const { paymentIntent, error: paymentError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email,
                    name: user.displayName
                }
            }
        });

        if (paymentError) {
            console.log(paymentError);
        } else {
            if (paymentIntent.status === 'succeeded') {
                toast.success('Successfully paid', {
                    position: 'bottom-center',
                    autoClose: 2000
                });
                const payment = {
                    email: user.email,
                    price: price,
                    transactionId: paymentIntent.id,
                    class_id: data.id,
                    date: new Date(),
                    class_name: queryClass.data.data.name,
                    class_title: queryClass.data.data.title,
                    class_image: queryClass.data.data.image
                }
                mutate(payment);
            }
        }
    }

    return (
        <div className='border-2 border-green-600 rounded-lg'>
            {
                isIdle &&
                <form onSubmit={handleSubmit}>
                    <CardElement className=''
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <Button variant='outlined' type='submit' disabled={!stripe}>Pay</Button>
                </form>
            }
            {
                isPending &&
                <div>
                    <ClockLoading />
                </div>
            }
            {
                isSuccess &&
                <div>
                    Payment info save in database
                </div>
            }

        </div>
    )
}

export default CheckoutForm