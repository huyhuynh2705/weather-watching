import React, { useEffect } from 'react';
// import { Button } from '@material-ui/core'
import AppBarUser from '../../components/AppBar/AppBarUser'
import DataBar from '../../components/DataBar/DataBar'
import Chart from '../../components/Chart/Chart'
import { useDispatch } from 'react-redux';
import { getData, getAllDeviceData } from '../../action/data'
import { TOKEN_NAME } from '@environments';

function User() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem(TOKEN_NAME));

  useEffect(() => {
    dispatch(getData(user.result._id))
    dispatch(getAllDeviceData(user.result._id))
    setInterval(() => dispatch(getData(user.result._id)), 10000);
  }, [dispatch]);

  return (
    <div>
      <AppBarUser />
      <DataBar />
      <Chart />
    </div>
  )
}

export default User
