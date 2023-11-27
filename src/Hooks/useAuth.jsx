import React, { useContext } from 'react'
import { AuthenticationContext } from '../Contexts/AuthenticationContextProvider'

function useSignInWithMailPassHook() {
    const { signInUser } = useContext(AuthenticationContext);
    return {signInUser};
}

export default useSignInWithMailPassHook