// Logout component

import React from 'react'

const Logout = (props) => (
    <div className="">
        <button id="logout-button" onClick={props.handleLogout} type="submit" className="btn btn-outline-info btn-sm">{props.user.username} - LOGOUT</button>
    </div>
)
export default Logout