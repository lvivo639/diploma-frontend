import { Box, CircularProgress } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/Remove';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import React from 'react';
import getImageUrl from '../../../common/getImageUrl';
import { Product } from '../../../common/types';
import useStyles from './useStyles';

type ProductCardProps = {
  product: Product;
  onEdit?: () => Promise<void>;
  onRemove?: () => Promise<void>;
  onAddToCart?: () => Promise<void>;
  countValue?: number;
  onCountChange?: (newValue: number) => Promise<number>;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onRemove,
  onCountChange,
  countValue,
  onEdit,
  onAddToCart,
}) => {
  const classes = useStyles();

  const [count, setCount] = React.useState<number | undefined>(countValue);

  const [countLoading, setCountLoading] = React.useState(false);

  const handleAddCount = async () => {
    if (count === undefined || !onCountChange) return;
    setCountLoading(true);
    const data = await onCountChange(count + 1);
    setCount(data);
    setCountLoading(false);
  };

  const handleSubCount = async () => {
    if (count === undefined || !onCountChange) return;
    setCountLoading(true);
    const data = await onCountChange(count - 1);
    setCount(data);
    setCountLoading(false);
  };

  return (
    <Card className={classes.root} elevation={4}>
      <CardHeader title={product.name} />
      <CardMedia
        image={getImageUrl(product.image?.url)}
        title={product.name}
        className={classes.media}
      />
      <CardContent>
        <Typography color="textSecondary" variant="h5" component="p">
          {product.price} UAH{' '}
          {product.oldPrice !== undefined && (
            <Typography
              color="textSecondary"
              variant="h6"
              component="span"
              className={classes.oldPrice}
            >
              {product.oldPrice} UAH
            </Typography>
          )}
        </Typography>
        <Typography color="textSecondary" component="p">
          Description: {product.description}
        </Typography>
        {count !== undefined && onCountChange && (
          <>
            {countLoading ? (
              <CircularProgress />
            ) : (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <IconButton>
                  <RemoveIcon onClick={handleSubCount} />
                </IconButton>
                <Typography>{count}</Typography>
                <IconButton onClick={handleAddCount}>
                  <AddIcon />
                </IconButton>
              </Box>
            )}
          </>
        )}
      </CardContent>
      <CardActions disableSpacing>
        {onEdit && (
          <IconButton>
            <EditIcon onClick={onEdit} />
          </IconButton>
        )}
        {onRemove && (
          <IconButton>
            <DeleteIcon onClick={onRemove} />
          </IconButton>
        )}
        {onAddToCart && (
          <IconButton>
            <ShoppingCartIcon onClick={onAddToCart} />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
