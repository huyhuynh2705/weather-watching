import React, { useEffect } from 'react';
import NavBar from '../../components/AppBar/AppBar'
import DataBar from '../../components/DataBar/DataBar'
import Chart from '../../components/Chart/Chart'
import { useDispatch } from 'react-redux';
import { getData, getChartData } from '../../action/data'
import { TOKEN_NAME } from '@environments';
import { useSelector } from 'react-redux'
import { Button, Typography } from '@material-ui/core'
function User() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem(TOKEN_NAME));
  // const store = useSelector((state) => state);
  // console.log(store);

  useEffect(() => {
    dispatch(getData(user.result._id))
    dispatch(getChartData(user.result._id))
    const interval = setInterval(() =>{ 
      dispatch(getData(user.result._id))
      dispatch(getChartData(user.result._id))
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <NavBar />
      <DataBar />
      {user.result.deviceSetName? <Chart /> :
        <div style={{marginTop: '25vh'}}>
          <Typography align="center" variant="h6" gutterBottom>Your account doesn't have a device set. Please contact us to give you a set.</Typography>
        </div>
      }
    </div>
  )
}

export default User
