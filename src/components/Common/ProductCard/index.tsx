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

  const [actionsLoading, setActionsLoading] = React.useState(false);
  const [count, setCount] = React.useState<number | undefined>(countValue);

  const handleAddCount = async () => {
    if (count === undefined || !onCountChange || count + 1 > product.count)
      return;
    setActionsLoading(true);
    const data = await onCountChange(count + 1);
    setCount(data);
    setActionsLoading(false);
  };

  const handleSubCount = async () => {
    if (count === undefined || !onCountChange || count - 1 < 1) return;
    setActionsLoading(true);
    const data = await onCountChange(count - 1);
    setCount(data);
    setActionsLoading(false);
  };

  const waitForAction = async (action: () => Promise<void>) => {
    setActionsLoading(true);
    await action();
    setActionsLoading(false);
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
          Count: {product.count}
        </Typography>
        <Typography color="textSecondary" component="p">
          Description: {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {actionsLoading ? (
          <CircularProgress />
        ) : (
          <>
            {count !== undefined && onCountChange && (
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

            {onEdit && (
              <IconButton>
                <EditIcon onClick={() => waitForAction(onEdit)} />
              </IconButton>
            )}
            {onRemove && (
              <IconButton>
                <DeleteIcon onClick={() => waitForAction(onRemove)} />
              </IconButton>
            )}
            {onAddToCart && (
              <IconButton>
                <ShoppingCartIcon onClick={() => waitForAction(onAddToCart)} />
              </IconButton>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductCard;
