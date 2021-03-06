import { makeStyles } from "@material-ui/core/styles"
import bg from '../../images/bg.png'

export default makeStyles((theme) => ({
    root: {
        height: '97vh',
      },
      image: {
        backgroundImage: `url(${bg})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      paper: {
        margin: theme.spacing(8, 6),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        paddingLeft: '20px',
        paddingRight: '20px',
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
}))
