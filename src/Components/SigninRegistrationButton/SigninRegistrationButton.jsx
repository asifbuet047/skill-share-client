import { Button } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

function SigninRegistrationButton() {
    return (
        <div className='p-2'>
            <NavLink to='/signin'>
                <span>
                    <Button variant='contained'>Sign In</Button>
                </span>
            </NavLink>
        </div>
    )
}

export default SigninRegistrationButton