import React from 'react'
import { ClockLoader } from 'react-spinners'

function ClockLoading() {
    return (
        <div className='w-full'>
            <ClockLoader size={'3em'}></ClockLoader>
        </div>
    )
}

export default ClockLoading