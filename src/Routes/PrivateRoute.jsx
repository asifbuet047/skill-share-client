import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { AuthenticationContext } from '../Contexts/AuthenticationContextProvider';
import ThreeCircleLoading from '../Components/Loading/BeatLoading';
import ClockLoading from '../Components/DataLoadingComponents/ClockLoading';

function PrivateRoute({ children }) {
    const { user, userLoading } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    console.log(user);
    console.log(userLoading);

    if (userLoading) {
        return <ClockLoading></ClockLoading>;
    }

    if (user?.email) {
        return children;
    }
    return <Navigate to='/signin' replace></Navigate>;

}

export default PrivateRoute