import { Tooltip } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'

function HomeButton() {
    return (
        <Tooltip title='Home'>
            <div className='p-2'>
                <NavLink to='/'><span className=''>Home</span></NavLink>
            </div>
        </Tooltip>

    )
}

export default HomeButton