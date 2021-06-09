import { Box, Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import errorToString from '../../../common/errorToString';
import { RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import BasicPaper from '../../Unknown/BasicPaper';
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
      history.push(`/supplier/${supplierId}/orders`);
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
  };

  if (minimumPrice === undefined) return <CircularProgress />;

  return (
    <BasicPaper
      title="Create an order"
      subtitle="Fill form to create an order"
      loading={loading}
    >
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
    </BasicPaper>
  );
};

export default OrderScreen;
