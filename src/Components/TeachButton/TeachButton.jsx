import React from 'react'
import { NavLink } from 'react-router-dom'
import { getProjectName } from '../../Utilities/Utilities'

function TeachButton() {
    return (
        <div className='p-2'>
            <NavLink to={'/becomeateacher'}>
                <span>
                    {
                        `Teach On ${getProjectName()}`
                    }
                </span>
            </NavLink>
        </div>
    )
}

export default TeachButton