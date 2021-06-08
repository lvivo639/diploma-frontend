import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paid: {
    backgroundColor: '#a8dadc',
    color: 'black',
  },
  notPaid: {
    backgroundColor: '#e63946',
    color: 'white',
  },
}));

export default useStyles;
