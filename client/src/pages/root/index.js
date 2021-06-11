import React, { useEffect } from 'react';
import { TOKEN_NAME } from '@environments';
import Admin from '../admin/index.js'
import User from '../user/index.js'
import { useAuth } from '@contexts'
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux'

const Root = () => {
    const user = JSON.parse(localStorage.getItem(TOKEN_NAME));
    const { logout } = useAuth()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        dispatch({ type: 'USER_LOGOUT' })
        logout()
      };

    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
        }
      }, []);
    return (
        <div>
            {(user.result.role == 'User')? <User /> : <Admin />}
        </div>
    )
}

export default Root