import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { ProductOrder } from '../../../common/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
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
          <ListItemText
            primary={`${productOrder.product.name} x${productOrder.product.count}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ProductListCell;
