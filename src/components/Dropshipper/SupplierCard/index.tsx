import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import React from 'react';
import getImageUrl from './../../../common/getImageUrl';
import { SupplierSetting } from './../../../common/types';
import useStyles from './useStyles';
type SupplierCardProps = {
  supplier: SupplierSetting;
  onSupplierClick: () => void;
};

const SupplierCard: React.FC<SupplierCardProps> = ({
  supplier,
  onSupplierClick,
}) => {
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
      <CardActions disableSpacing>
        <IconButton>
          <ArrowRightAltIcon onClick={onSupplierClick} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SupplierCard;
