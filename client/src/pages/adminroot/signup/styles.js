import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    btncontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
    },
    updatebtncontainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    button: {
        width: '300px',
        marginLeft: '15px',
        marginRight: '15px',
        marginTop: '15px'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '20px',
        marginTop: '15px',
    },
    text: {
        width: '400px',
    },
    [theme.breakpoints.down('sm')]: {
        title: {
            fontSize: '15px',
            fontWeight: 'normal',
        },
        text: {
            width: '200px',
        },
        btncontainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        updatebtncontainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        formControl: {
            width: '300px',
        },
      }
}))



// import { makeStyles } from '@material-ui/core/styles'

// export default makeStyles((theme) => ({
//     root: {
//         padding: theme.spacing(2),
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//     },
//     form: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//       },
//     button: {
//         width: '300px',
//         marginLeft: '15px',
//         marginRight: '15px',
//         marginTop: '15px'
//     },
//     title: {
//         marginTop: '10px',
//     },
//     title2: {
//         marginTop: '30px',
//     },
//     text: {
//         marginBottom: '5px'
//     }
// }))
