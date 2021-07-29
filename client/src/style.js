import {
    makeStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    image: {
        marginLeft: '15px',
    },
    App: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
    },

    container: {
        width: '600px',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
    },
    margin: {
        marginTop: 4,
    },
    padding: {
        padding: 10,
    },
    video: {
        width: '550px',
        [theme.breakpoints.down('xs')]: {
            width: '300px',
        },
    },
    gridContainer: {
        width: '100%',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    paper: {
        padding: '0px 20px',
        border: '2px solid black',
        margin: '10px',
    },
}));

export default useStyles