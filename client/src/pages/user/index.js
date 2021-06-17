import React, { useEffect } from 'react';
// import { Button } from '@material-ui/core'
import NavBar from '../../components/AppBar/AppBar'
import DataBar from '../../components/DataBar/DataBar'
import Chart from '../../components/Chart/Chart'
import { useDispatch } from 'react-redux';
import { getData, getChartData } from '../../action/data'
import { TOKEN_NAME } from '@environments';
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core';

function User() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem(TOKEN_NAME));
  // const store = useSelector((state) => state);
  // console.log(store);

  useEffect(() => {
    dispatch(getData(user.result._id))
    dispatch(getChartData(user.result._id))
  }, []);

  return (
    <div>
      <NavBar />
      {/* <Button>Refresh</Button> */}
      <DataBar />
      <Chart />
    </div>
  )
}

export default User
