import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider'

function SigninRegistrationButton() {
    const { user } = useContext(AuthenticationContext);
    return (
        <div className='p-2'>
            {
                user ?
                    <Button variant='contained'>{user?.email}</Button>
                    : <NavLink to='/signin'>
                        <span>
                            <Button variant='contained'>Sign In</Button>
                        </span>
                    </NavLink>
            }

        </div>
    )
}

export default SigninRegistrationButton