import React, { useContext } from 'react'
import { AuthenticationContext } from '../Contexts/AuthenticationContextProvider'

function useAuth() {
    const { signOutUser } = useContext(AuthenticationContext);
    return { signOutUser };
}

export default useAuth