import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ProductOrder } from '../../../common/types';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 560,
    },
    item: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  }),
);

type ProductListCellProps = {
  productOrders: Array<ProductOrder>;
};

const ProductListCell: React.FC<ProductListCellProps> = ({ productOrders }) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {productOrders.map((productOrder) => (
        <ListItem className={classes.item}>
          <ListItemIcon>
            <ChangeHistoryIcon />
          </ListItemIcon>
          <ListItemText>
            <Button
              component={RouterLink}
              to={`/products/${productOrder.product.id}`}
            >
              {productOrder.product.name} <b>x{productOrder.count}</b>
            </Button>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default ProductListCell;
