import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    buttoncontainer: {
      // display: 'flex',
      //flexGrow: 'wrap',
      // justifyContent: 'flex-end'
    },
    button: {
      marginRight: '20px',
      fontSize: '15px',
      fontWeight: '500',
    },
    title: {
      flexGrow: 1,
      color: 'rgba(255,255,255)',
      textDecoration: 'none',
      fontSize: '20px',
      fontWeight: '500',
    },
    paperMenu: {
      width: '200px',
      marginTop: '10px',
    },
    menu: {
      justifyContent: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      title: {
        flexGrow: 1,
        color: 'rgba(255,255,255)',
        textDecoration: 'none',
        fontSize: '10px',
        fontWeight: 'normal',
      },
      button: {
        marginRight: '0px',
        fontSize: '10px',
      },
      paperMenu: {
        width: '150px',
        marginTop: '10px',
      },
    }
}))
