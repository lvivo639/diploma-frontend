import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ProductOrder } from '../../../common/types';
import ProductCard from './../../Common/ProductCard/index';

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

const CartScreen: React.FC = () => {
  const history = useHistory();
  const [productOrderList, setProductOrderList] = React.useState<
    Array<ProductOrder>
  >([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setProductOrderList(mock);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleRemove = (id: number) => async () => {
    console.log(id);
  };

  const handleCountChange = (id: number) => async (newValue: number) => {
    return newValue;
  };

  const { supplierId } = useParams<{ supplierId: string }>();

  const createOrder = () => {
    history.push(`/supplier/${supplierId}/cart/order`);
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <Box mb={4}>
        <Typography variant="h3">Your cart</Typography>
        <Typography>Add some products to create an order.</Typography>
      </Box>
      {productOrderList.length ? (
        <>
          <Box mb={2}>
            <Button variant="outlined" onClick={createOrder}>
              Create an order
            </Button>
          </Box>

          <Grid container spacing={2} justify="flex-start">
            {productOrderList.map((productOrder) => (
              <Grid item key={productOrder.id}>
                <ProductCard
                  product={productOrder.product}
                  countValue={productOrder.count}
                  onCountChange={handleCountChange(productOrder.id)}
                  onRemove={handleRemove(productOrder.id)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography>Your cart list is empty.</Typography>
      )}
    </>
  );
};

export default CartScreen;
