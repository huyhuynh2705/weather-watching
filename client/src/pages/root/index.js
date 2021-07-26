import React, { useEffect } from 'react';
import { TOKEN_NAME } from '@environments';
import Admin from '../admin/index.js'
import User from '../user/index.js'
import { Button, Typography } from '@material-ui/core'

const Root = () => {
    const user = JSON.parse(localStorage.getItem(TOKEN_NAME));

    if (user.result.role == 'User') {
        return( <User /> )
    } else if (user.result.role == 'Admin') {
        return( <Admin /> )
    } else {
        return (
            <div style={{marginTop: '35vh'}}>
                <Typography align="center" variant="h6" gutterBottom>Your registration account is being processed, please wait...</Typography>
                <div style={{display: 'flex','justify-content':'center','align-items': 'center'}}>
                    <Button variant="contained" color="primary" onClick={logout}>Log out</Button>
                </div>
            </div>
        )
    }
}

export default Root