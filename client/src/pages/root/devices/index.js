import React, { useEffect } from 'react';
import AppBarUser from '@components/AppBar/AppBarUser'
import DataBar from '@components/DataBar/DataBar'
import Device from '@components/Device/Device'
import { useDispatch } from 'react-redux';
import { getData } from '../../../action/data'
import { TOKEN_NAME } from '@environments';

const Devices = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(TOKEN_NAME));
  
    useEffect(() => {
      dispatch(getData(user.result._id));
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