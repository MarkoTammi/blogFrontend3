


// Component to display logged in username

import React from 'react'

const DisplayName = (props) => (
    <div className="nav align-middle">
        <p>{props.user.username}</p>
    </div>
)

export default DisplayName