import React from "react"
import { Redirect } from "react-router-dom"

export default function withUser(Component) {
    const WithUser = ({ user, ...props }) =>
        user ? <Component {...props} user={user} /> : <Redirect to="/login" />

    return WithUser;
}