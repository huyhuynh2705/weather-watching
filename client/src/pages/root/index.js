import React from 'react';
import { TOKEN_NAME } from '@environments';
import Admin from '../admin/index.js'
import User from '../user/index.js'

const Root = () => {
    const user = JSON.parse(localStorage.getItem(TOKEN_NAME));
    return (
        <div>
            {(user.result.role == 'User')? <User /> : <Admin />}
        </div>
    )
}

export default Root