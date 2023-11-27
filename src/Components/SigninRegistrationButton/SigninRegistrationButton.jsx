import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthenticationContext } from '../../Contexts/AuthenticationContextProvider'
import { Dropdown } from 'flowbite-react';

function SigninRegistrationButton() {
    const { user, signOutUser } = useContext(AuthenticationContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        signOutUser();
        navigate('/');
    }
    return (
        <div className='p-2'>
            {
                user ?
                    <>
                        <Dropdown label={user?.email}>
                            <Dropdown.Header>
                                {
                                    user.displayName ? user.displayName : user.email
                                }
                            </Dropdown.Header>
                            <Dropdown.Divider />
                            <NavLink to={'/dashboard'}>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                            </NavLink>
                            <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
                        </Dropdown>
                    </>

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