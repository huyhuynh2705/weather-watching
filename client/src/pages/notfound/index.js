import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <Typography variant='h4' align='center'>
        404 Not Found
      </Typography>
      <Typography variant='h6' align='center'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          Back to homepage
        </Link>
      </Typography>
    </div>
  )
}

export default NotFound
