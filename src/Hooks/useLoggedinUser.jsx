import React, { useContext } from 'react'
import { AuthenticationContext } from '../Contexts/AuthenticationContextProvider'

function useLoggedinUser() {
    const { user } = useContext(AuthenticationContext)
    return user;
}

export default useLoggedinUser