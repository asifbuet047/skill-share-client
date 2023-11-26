import React from 'react'
import { NavLink } from 'react-router-dom'

function HomeButton() {
    return (
        <div className='p-2'>
            <NavLink to='/'><span className=''>Home</span></NavLink>
        </div>
    )
}

export default HomeButton