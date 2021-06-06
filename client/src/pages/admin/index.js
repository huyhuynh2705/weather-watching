import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useStyles from "./styles"
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box'
import AppBarAdmin from '@components/AppBar/AppBarAdmin'
import AdminDataBar from '@components/AdminDataBar/AdminDataBar'
import AdminDevices from '@components/AdminDevices/AdminDevices'
import AdminDeviceSet from '@components/AdminDeviceSet/AdminDeviceSet'
import AdminUsers from '@components/AdminUsers/AdminUsers'
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux'

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const store = useSelector((state) => state);
  //console.log(store);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>
            {children}
          </Box>
        </Container>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function Admin() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const limitPerPage = 5;

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // useEffect(() => {
  //   dispatch(getCountAllUser())
  //   dispatch(getAdminUser({page: 1, limit: limitPerPage}))
  //   dispatch(getCountDeviceSet())
  //   dispatch(getCountDevice())
  //   dispatch(getAdminDeviceSet({page: 1, limit: limitPerPage}))
  //   dispatch(getAdminDevice({page: 1, limit: limitPerPage}))
  // }, [dispatch]);


  return (
    <div>
      <AppBarAdmin />
      <AdminDataBar />
      <Container>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Device List" {...a11yProps(0)} />
              <Tab label="Device Set List" {...a11yProps(1)} />
              <Tab label="User List" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <AdminDevices limitPerPage={limitPerPage}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AdminDeviceSet limitPerPage={limitPerPage}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AdminUsers limitPerPage={limitPerPage} />
          </TabPanel>
      </Container>
    </div>
  )
}

export default Admin
