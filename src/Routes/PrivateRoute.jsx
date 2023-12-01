import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../Contexts/AuthenticationContextProvider';
import ClockLoading from '../Components/DataLoadingComponents/ClockLoading';
import { useContext } from 'react';

function PrivateRoute({ children }) {
    const { user, userLoading } = useContext(AuthenticationContext);
    const navigate = useNavigate();
    const location = useLocation();

    if (user) {
        return children;
    }

    return <Navigate to='/signin' state={location.pathname} replace></Navigate>;
}

export default PrivateRoute