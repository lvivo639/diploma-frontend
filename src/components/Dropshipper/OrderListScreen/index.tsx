import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { Order } from '../../../common/types';
import getOrderStatusText from './getOrderStatusText';
import getPrice from './getPrice';
import ProductListCell from './ProductListCell';
import useStyles from './useStyles';

const mockList: Array<Order> = [
  {
    id: 1,
    productOrders: [
      {
        id: 1,
        product: {
          id: 1,
          name: 'id',
          image: {
            _id: '1',
            name: 'a',
            url: '/11111111',
          },
          description: 'asdsdfa',
          price: 1,
          oldPrice: 1,
          count: 2,
          suplier_setting_id: 1,
        },
        price: 135,
        count: 1,
      },
      {
        id: 1,
        product: {
          id: 1,
          name: 'id',
          image: {
            _id: '1',
            name: 'a',
            url: '/11111111',
          },
          description: 'asdsdfa',
          price: 1,
          oldPrice: 1,
          count: 2,
          suplier_setting_id: 1,
        },
        price: 135,
        count: 1,
      },
    ],
    address: 'address',
    fullName: 'fullName',
    description: 'description',
    price: 12,
    status: 'packaging',
  },
  {
    id: 1,
    productOrders: [],
    address: 'address',
    fullName: 'fullName',
    description: 'description',
    price: 12,
    status: 'sent',
  },
  {
    id: 1,
    productOrders: [],
    address: 'address',
    fullName: 'fullName',
    description: 'description',
    price: 12,
    status: 'received',
  },
  {
    id: 1,
    productOrders: [],
    address: 'address',
    fullName: 'fullName',
    description: 'description',
    price: 12,
    status: 'sentBack',
  },
];

const OrderListScreen: React.FC = () => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Products</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Supplier price</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mockList.map((mock) => (
            <TableRow key={mock.id}>
              <TableCell component="th" scope="row">
                {mock.id}
              </TableCell>
              <TableCell className={classes?.[mock.status]}>
                {getOrderStatusText(mock.status)}
              </TableCell>
              <TableCell>
                <ProductListCell productOrders={mock.productOrders} />
              </TableCell>
              <TableCell>{mock.address}</TableCell>
              <TableCell>{getPrice(mock)}</TableCell>
              <TableCell>{mock.price}</TableCell>
              <TableCell>{mock.fullName}</TableCell>
              <TableCell>{mock.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderListScreen;
