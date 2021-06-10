import { Box, Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ProductOrder, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import BasicPaper from '../../Unknown/BasicPaper';
import errorToString from './../../../common/errorToString';
import ProductCard from './../../Common/ProductCard/index';
import InfoSnackbar from './../../Unknown/InfoSnackbar/index';

const CartScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { supplierId } = useParams<{ supplierId: string }>();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [productOrderList, setProductOrderList] = React.useState<
    Array<ProductOrder>
  >([]);

  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      setSnackbarText('');
      setLoading(true);
      try {
        const response: any = await dispatch(
          sendRequest('get', `/product-orders/findProductOrders`, null, {
            supplier_setting_id: supplierId,
            dropshipper_setting_id: currentUser?.dropshipper_setting?.id,
          }),
        );
        setProductOrderList((response?.data || []) as Array<ProductOrder>);
      } catch (e) {
        setSnackbarText(errorToString(e));
      }
      setLoading(false);
    };
    fetchData();
  }, [currentUser?.dropshipper_setting?.id, dispatch, supplierId]);

  const handleRemove = (id: number) => async () => {
    setSnackbarText('');
    try {
      await dispatch(sendRequest('delete', `/product-orders/${id}`));

      const response: any = await dispatch(
        sendRequest('get', `/product-orders/findProductOrders`, null, {
          supplier_setting_id: supplierId,
          dropshipper_setting_id: currentUser?.dropshipper_setting?.id,
        }),
      );
      setProductOrderList((response?.data || []) as Array<ProductOrder>);
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
  };

  const handleCountChange = (id: number) => async (newValue: number) => {
    setSnackbarText('');
    try {
      await dispatch(
        sendRequest('post', `/product-orders/changeCount/${id}`, null, {
          newValue,
        }),
      );
      return newValue;
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
    return -1;
  };

  const createOrder = () => {
    history.push(`/supplier/${supplierId}/cart/order`);
  };

  return (
    <BasicPaper
      title="Cart"
      subtitle="Add some products to create an order"
      loading={loading}
    >
      {productOrderList.length ? (
        <>
          <Box mb={2}>
            <Button variant="outlined" onClick={createOrder} color="primary">
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
      <InfoSnackbar
        text={snackbarText}
        setText={setSnackbarText}
        severity="error"
      />
    </BasicPaper>
  );
};

export default CartScreen;
