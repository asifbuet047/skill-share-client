import React from 'react'
import { useParams } from 'react-router-dom'

function Feedback() {
    console.log(useParams());
    return (
        <div>Feedback</div>
    )
}

export default Feedback