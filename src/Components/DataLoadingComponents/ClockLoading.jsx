import React from 'react'
import { ClockLoader } from 'react-spinners'

function ClockLoading() {
    return (
        <div className='w-full h-full flex flex-row justify-center items-center p-5'>
            <ClockLoader></ClockLoader>
        </div>
    )
}

export default ClockLoading