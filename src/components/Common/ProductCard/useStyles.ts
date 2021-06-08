import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  media: {
    height: 200,
  },
  oldPrice: {
    textDecoration: 'line-through',
  },
}));

export default useStyles;
