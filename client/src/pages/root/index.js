import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core'
import AppBar from '../../components/AppBar/AppBar'
import DataBar from '../../components/DataBar/DataBar'
import Chart from '../../components/Chart/Chart'
import { useDispatch } from 'react-redux';
import { getData } from '../../action/data'
import { TOKEN_NAME } from '@environments';

function Root() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem(TOKEN_NAME));

  useEffect(() => {
    dispatch(getData(user.result._id));
  }, []);

  return (
    <div>
      <AppBar />
      <DataBar />
      <Chart />
    </div>
  )
}

export default Root
