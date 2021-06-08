import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import errorToString from '../../../common/errorToString';
import { RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import InfoSnackbar from '../../Unknown/InfoSnackbar';
import OrderForm from '../OrderForm';
import { OrderFormikProps } from '../OrderForm/types';

const OrderScreen: React.FC = () => {
  const history = useHistory();
  const { supplierId } = useParams<{ supplierId: string }>();

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.user);

  const [minimumPrice, setMinimumPrice] = React.useState<number | undefined>();

  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      setSnackbarText('');
      setLoading(true);
      try {
        const response: any = await dispatch(
          sendRequest('get', `/carts/price`, null, {
            supplier_setting_id: supplierId,
            dropshipper_setting_id: currentUser?.dropshipper_setting?.id,
          }),
        );
        setMinimumPrice(response?.data as number);
        setLoading(false);
      } catch (e) {
        setSnackbarText(errorToString(e));
      }
    };
    fetchData();
  }, [currentUser?.dropshipper_setting?.id, dispatch, supplierId]);

  const backToCart = () => {
    history.push(`/supplier/${supplierId}/cart`);
  };

  const onSubmit = async (values: OrderFormikProps) => {
    setSnackbarText('');
    setLoading(true);
    try {
      await dispatch(
        sendRequest('post', `/carts/createOrder`, values, {
          supplier_setting_id: supplierId,
          dropshipper_setting_id: currentUser?.dropshipper_setting?.id,
        }),
      );
      setLoading(false);
      // history.push(`/supplier/${supplierId}`);
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
  };

  if (loading || minimumPrice === undefined) return <CircularProgress />;

  return (
    <>
      <Box mb={4}>
        <Typography variant="h3">Create an order</Typography>
        <Typography>Fill form to create an order</Typography>
      </Box>
      <Button onClick={backToCart} variant="outlined">
        Back to Cart
      </Button>
      <Box mt={2}>
        <OrderForm onSubmit={onSubmit} minimumPrice={minimumPrice} />
      </Box>

      <InfoSnackbar
        text={snackbarText}
        setText={setSnackbarText}
        severity="error"
      />
    </>
  );
};

export default OrderScreen;
