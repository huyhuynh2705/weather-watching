import React, { useEffect, useState } from 'react';
import { getAdminDevice, getCountDevice } from '../../action/device'
import { useDispatch } from 'react-redux';
import AppBarAdmin from '@components/AppBar/AppBarAdmin'
import AdminDataBar from '@components/AdminDataBar/AdminDataBar'
import AdminDevices from '@components/AdminDevices/AdminDevices'

function Admin() {
  const dispatch = useDispatch();
  const limitPerPage = 5;

  useEffect(() => {
    dispatch(getCountDevice())
    dispatch(getAdminDevice({page: 1, limit: limitPerPage}))
  }, [dispatch]);


  return (
    <div>
      <AppBarAdmin />
      <AdminDataBar />
      <AdminDevices limitPerPage={limitPerPage}/>
    </div>
  )
}

export default Admin
