import { Box, Button } from '@material-ui/core';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ProductOrder } from '../../../common/types';
import OrderForm from '../OrderForm';
import { OrderFormikProps } from '../OrderForm/types';

const mock: Array<ProductOrder> = [
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
];

const OrderScreen: React.FC = () => {
  const history = useHistory();
  const { supplierId } = useParams<{ supplierId: string }>();

  const backToCart = () => {
    history.push(`/supplier/${supplierId}/cart`);
  };

  const onSubmit = async (values: OrderFormikProps) => {
    console.log(values);
  };

  return (
    <>
      <Button onClick={backToCart} variant="outlined">
        Back to Cart
      </Button>
      <Box mt={2}>
        <OrderForm onSubmit={onSubmit} productOrders={mock} />
      </Box>
    </>
  );
};

export default OrderScreen;
