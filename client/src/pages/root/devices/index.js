import React, { useEffect } from 'react';
import AppBarUser from '@components/AppBar/AppBarUser'
import DataBar from '@components/DataBar/DataBar'
import Device from '@components/Device/Device'
import { useDispatch, useSelector } from 'react-redux';
import { TOKEN_NAME } from '@environments';
import { getAllDeviceData } from '../../../action/data'

const Devices = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(TOKEN_NAME));
  
    useEffect(() => {
      dispatch(getAllDeviceData(user.result._id))
    }, []);

    return (
      <div>
        <AppBarUser />
        <DataBar />
        <Device />
      </div>
    )
}

export default Devices