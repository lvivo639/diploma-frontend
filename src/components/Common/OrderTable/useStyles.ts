import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 1200,
  },
  packaging: {
    backgroundColor: '#1d3557',
    color: 'white',
  },
  sent: {
    backgroundColor: '#457b9d',
    color: 'white',
  },
  received: {
    backgroundColor: '#a8dadc',
    color: 'black',
  },
  sentBack: {
    backgroundColor: '#e63946',
    color: 'white',
  },
});

export default useStyles;
