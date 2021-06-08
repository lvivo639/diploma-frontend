import { TableRow } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import { Order } from '../../../common/types';
import getOrderStatusText from './../../Common/OrderTable/getOrderStatusText';
import getPrice from './../../Common/OrderTable/getPrice';
import ProductListCell from './../../Common/OrderTable/ProductListCell';
import useStyles from './../../Common/OrderTable/useStyles';

type DropshipperOrderItemProps = {
  order: Order;
};

const DropshipperOrderItem: React.FC<DropshipperOrderItemProps> = ({
  order,
}) => {
  const classes = useStyles();

  return (
    <TableRow key={order.id}>
      <TableCell component="th" scope="row">
        {order.id}
      </TableCell>
      <TableCell className={classes?.[order.status]}>
        {getOrderStatusText(order.status)}
      </TableCell>
      <TableCell>
        <ProductListCell productOrders={order.productOrders} />
      </TableCell>
      <TableCell>{order.address}</TableCell>
      <TableCell>{getPrice(order)}</TableCell>
      <TableCell>{order.price}</TableCell>
      <TableCell>{order.fullName}</TableCell>
      <TableCell>{order.description}</TableCell>
    </TableRow>
  );
};

export default DropshipperOrderItem;
