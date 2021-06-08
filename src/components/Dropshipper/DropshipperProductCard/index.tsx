import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import getImageUrl from '../../../common/getImageUrl';
import { Product } from '../../../common/types';
import useStyles from './useStyles';

type DropshipperProductCardProps = {
  product: Product;
  // onRemove: (id: number) => Promise<void>;
};

const DropshipperProductCard: React.FC<DropshipperProductCardProps> = ({
  product,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={4}>
      <CardHeader title={product.name} />
      <CardMedia
        image={getImageUrl(product.image?.url)}
        title={product.name}
        className={classes.media}
      />
      <CardContent>
        <Typography color="textSecondary" component="p">
          oldPrice: {product.oldPrice}
        </Typography>
        <Typography color="textSecondary" component="p">
          price: {product.price}
        </Typography>
        <Typography color="textSecondary" component="p">
          Count: {product.count}
        </Typography>
        <Typography color="textSecondary" component="p">
          Description: {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default DropshipperProductCard;
