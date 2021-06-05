import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import { useHistory } from 'react-router-dom';
import getImageUrl from './../../../common/getImageUrl';
import { Product } from './../../../common/types';
import useStyles from './useStyles';

type SupplierProductCardProps = {
  product: Product;
  onRemove: (id: number) => Promise<void>;
};

const SupplierProductCard: React.FC<SupplierProductCardProps> = ({
  product,
  onRemove,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const onEdit = (id: number) => {
    history.push(`/products/${id}`);
  };

  return (
    <Card className={classes.root}>
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
          <EditIcon onClick={() => onEdit(product.id)} />
        </IconButton>
        <IconButton>
          <DeleteIcon onClick={() => onRemove(product.id)} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SupplierProductCard;
