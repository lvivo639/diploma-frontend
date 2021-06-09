import React from 'react';
import { Order, OrderStatus } from '../../../common/types';
import OrderTable from '../../Common/OrderTable';
import BasicPaper from '../../Unknown/BasicPaper';
import SupplierOrderItem from '../SupplierOrderItem/index';

const orderList: Array<Order> = [
  {
    id: 1,
    product_orders: [
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
    product_orders: [],
    address: 'address',
    fullName: 'fullName',
    description: 'description',
    price: 12,
    status: 'sent',
  },
  {
    id: 1,
    product_orders: [],
    address: 'address',
    fullName: 'fullName',
    description: 'description',
    price: 12,
    status: 'received',
  },
  {
    id: 1,
    product_orders: [],
    address: 'address',
    fullName: 'fullName',
    description: 'description',
    price: 12,
    status: 'sentBack',
  },
];

const SupplierOrderTableScreen: React.FC = () => {
  const handleStatusChange = (id: number) => async (status: OrderStatus) => {
    console.log(id, status);
  };

  const handleDeliveryAmountChange = (id: number) => async (amount: number) => {
    console.log(id, amount);
  };

  return (
    <BasicPaper title="Your order list" subtitle="Order history">
      <OrderTable>
        {orderList.map((order) => (
          <SupplierOrderItem
            order={order}
            onStatusChange={handleStatusChange(order.id)}
            onDeliveryAmountChange={handleDeliveryAmountChange(order.id)}
          />
        ))}
      </OrderTable>
    </BasicPaper>
  );
};

export default SupplierOrderTableScreen;
