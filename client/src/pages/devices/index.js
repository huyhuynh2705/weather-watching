import React, { useState, useEffect } from 'react';
import AppBar from '../../components/AppBar/AppBar'
import DataBar from '../../components/DataBar/DataBar'
import Chart from '../../components/Chart/Chart'
import { useDispatch } from 'react-redux';
import { getData } from '../../action/data'
import { TOKEN_NAME } from '@environments';

const Devices = () => {
    // const dispatch = useDispatch();
    // const user = JSON.parse(localStorage.getItem(TOKEN_NAME));
  
    // useEffect(() => {
    //   dispatch(getData(user.result._id));
    // }, []);
  
    return (
      <div>
        <AppBar />
      </div>
    )
}

export default Devices