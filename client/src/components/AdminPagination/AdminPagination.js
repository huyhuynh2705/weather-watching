import React, { useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { getAdminDevice } from '../../action/device'
import { useDispatch, useSelector } from 'react-redux';
import useStyles from "./styles"
import { Container, Typography } from '@material-ui/core';

const AdminPagination = ({limitPerPage}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const totalItems = useSelector((state) => state.count)

    const count = Math.ceil(totalItems/limitPerPage)

    const handleChange = (e, value) => {
        e.preventDefault()
        setPage(value)
        dispatch(getAdminDevice({page: value, limit: limitPerPage}))
    }

    return (
        <Container>
            <div className={classes.root}>
                <Pagination count={count} page={page} size="large" color="primary" onChange={handleChange}/>
            </div>
        </Container>
    );
}

export default AdminPagination