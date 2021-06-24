import React, { useEffect } from 'react';
import AppBar from '@components/AppBar/AppBar'
import DataBar from '@components/DataBar/DataBar'
import Device from '@components/Device/Device'
import { useDispatch } from 'react-redux';
import { TOKEN_NAME } from '@environments';
import { getAllDeviceData, getData } from '../../../action/data'
import { Typography } from '@material-ui/core'

const Devices = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(TOKEN_NAME));
  
    useEffect(() => {
      dispatch(getData(user.result._id))
      dispatch(getAllDeviceData(user.result._id))
    }, []);

    return (
      <div>
        <AppBar />
        <DataBar />
        {user.result.deviceSetName? <Device /> :
        <div style={{marginTop: '25vh'}}>
          <Typography align="center" variant="h6" gutterBottom>Your account doesn't have a device set. Please contact us to give you a set.</Typography>
        </div>
      }
      </div>
    )
}

export default Devices