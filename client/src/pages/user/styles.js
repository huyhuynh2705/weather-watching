import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    button: {
        width: '300px',
        marginLeft: '15px',
        marginRight: '15px',
        marginTop: '15px'
    },
}))
