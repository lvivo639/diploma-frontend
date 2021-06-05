import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import CardActions from '@material-ui/core/CardActions';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import getImageUrl from './../../../common/getImageUrl';
import { SupplierSetting } from './../../../common/types';
import useStyles from './useStyles';

type SupplierCardProps = {
  supplier: SupplierSetting;
};

const SupplierCard: React.FC<SupplierCardProps> = ({ supplier }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title={supplier.storageName} />
      <CardMedia
        image={getImageUrl(supplier.header?.url)}
        className={classes.media}
      />
      <CardContent>
        <Typography color="textSecondary" component="p">
          {supplier.description}
        </Typography>
      </CardContent>
      {/* <CardActions disableSpacing>
        <IconButton>
          <EditIcon onClick={() => onEdit(product.id)} />
        </IconButton>
        <IconButton>
          <DeleteIcon onClick={() => onRemove(product.id)} />
        </IconButton>
      </CardActions> */}
    </Card>
  );
};

export default SupplierCard;
