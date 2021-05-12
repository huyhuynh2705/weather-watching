import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core'
import AppBar from '../../components/AppBar/AppBar'
import DataBar from '../../components/DataBar/DataBar'
import Chart from '../../components/Chart/Chart'
import { useDispatch } from 'react-redux';
import { getData } from '../../action/data'

function Root() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
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
