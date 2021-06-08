import { Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import React from 'react';
import getImageUrl from '../../../common/getImageUrl';
import { ProductOrder } from '../../../common/types';
import useStyles from './useStyles';

type CartProductCardProps = {
  productOrder: ProductOrder;
  onRemove: () => Promise<void>;
};

const CartProductCard: React.FC<CartProductCardProps> = ({
  productOrder,
  onRemove,
}) => {
  const classes = useStyles();
  const [count, setCount] = React.useState<number>(productOrder.count);

  const addCount = () => {
    setCount((c) => c + 1);
  };

  const subCount = () => {
    setCount((c) => c - 1);
  };

  return (
    <Card className={classes.root} elevation={4}>
      <CardHeader title={productOrder.product.name} />
      <CardMedia
        image={getImageUrl(productOrder.product.image?.url)}
        title={productOrder.product.name}
        className={classes.media}
      />
      <CardContent>
        <Typography color="textSecondary" component="p">
          oldPrice: {productOrder.product.oldPrice}
        </Typography>
        <Typography color="textSecondary" component="p">
          price: {productOrder.price}
        </Typography>
        <Typography color="textSecondary" component="p">
          Description: {productOrder.product.description}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <IconButton>
            <RemoveIcon onClick={subCount} />
          </IconButton>
          <Typography>{count}</Typography>
          <IconButton onClick={addCount}>
            <AddIcon />
          </IconButton>
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CartProductCard;
