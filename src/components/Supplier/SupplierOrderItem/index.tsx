import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { Order, OrderStatus } from '../../../common/types';
import getOrderStatusText from '../../Common/OrderTable/getOrderStatusText';
import getPrice from '../../Common/OrderTable/getPrice';
import ProductListCell from '../../Common/OrderTable/ProductListCell';
import useStyles from './../../Common/OrderTable/useStyles';

type SupplierOrderItemProps = {
  order: Order;
  onStatusChange: (status: OrderStatus) => Promise<void>;
  onDeliveryCostChange: (cost: number) => Promise<void>;
};

const SupplierOrderItem: React.FC<SupplierOrderItemProps> = ({
  order,
  onStatusChange,
  onDeliveryCostChange,
}) => {
  const classes = useStyles();
  const [loadingStatus, setLoadingStatus] = React.useState(false);
  const [status, setStatus] = React.useState<OrderStatus>(order.status);
  const handleStatusChange = async (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setLoadingStatus(true);
    await onStatusChange(event.target.value as OrderStatus);
    setStatus(event.target.value as OrderStatus);
    setLoadingStatus(false);
  };

  const [loadingDeliveryCost, setLoadingDeliveryCost] = React.useState(false);
  const [deliveryCost, setDeliveryCost] = React.useState<string>(
    order.deliveryCost.toString(),
  );

  const handleDeliveryCostChange = async (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setDeliveryCost(event.target.value as string);
  };

  const handleDeliveryCostBlur = async (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    setLoadingDeliveryCost(true);
    await onDeliveryCostChange(Number(event.target.value as string));
    setDeliveryCost(event.target.value as string);
    setLoadingDeliveryCost(false);
  };

  const statusList: Array<OrderStatus> = [
    'packaging',
    'sent',
    'received',
    'sentBack',
  ];

  return (
    <TableRow key={order.id}>
      <TableCell component="th" scope="row">
        {order.id}
      </TableCell>
      <TableCell className={classes?.[status]}>
        {loadingStatus ? (
          <CircularProgress />
        ) : (
          <FormControl>
            <Select
              id={`status-${order.id}`}
              value={status}
              onChange={handleStatusChange}
              style={{ color: 'inherit' }}
            >
              {statusList.map((status) => (
                <MenuItem value={status}>{getOrderStatusText(status)}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </TableCell>
      <TableCell>
        <ProductListCell productOrders={order.productOrders} />
      </TableCell>
      <TableCell>{order.address}</TableCell>
      <TableCell>{getPrice(order)}</TableCell>
      <TableCell>
        {loadingDeliveryCost ? (
          <CircularProgress />
        ) : (
          <TextField
            variant="outlined"
            type="number"
            value={deliveryCost}
            onBlur={handleDeliveryCostBlur}
            onChange={handleDeliveryCostChange}
          />
        )}
      </TableCell>
      <TableCell>{order.price}</TableCell>
      <TableCell>{order.fullName}</TableCell>
      <TableCell>{order.description}</TableCell>
    </TableRow>
  );
};

export default SupplierOrderItem;
