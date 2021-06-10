import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Order, OrderStatus, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import OrderTable from '../../Common/OrderTable';
import BasicPaper from '../../Unknown/BasicPaper';
import InfoSnackbar from '../../Unknown/InfoSnackbar';
import SupplierOrderItem from '../SupplierOrderItem/index';
import errorToString from './../../../common/errorToString';

const SupplierOrderTableScreen: React.FC = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const [orderList, setOrderList] = React.useState<Array<Order>>([]);
  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      setSnackbarText('');
      try {
        setLoading(true);
        const response: any = await dispatch(
          sendRequest('get', `/supplier-settings/orders`),
        );

        setOrderList((response.data || []) as Array<Order>);
      } catch (e) {
        setSnackbarText(errorToString(e));
      }
      setLoading(false);
    };
    fetchData();
  }, [currentUser, dispatch]);

  const handleStatusChange = (id: number) => async (status: OrderStatus) => {
    setSnackbarText('');
    try {
      await dispatch(
        sendRequest(
          'post',
          `/supplier-settings/changeOrderStatus/${id}`,
          null,
          {
            status,
          },
        ),
      );

      const response: any = await dispatch(
        sendRequest('get', `/supplier-settings/orders`),
      );

      setOrderList((response.data || []) as Array<Order>);
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
  };

  return (
    <BasicPaper
      title="Your order list"
      subtitle="Order history"
      loading={loading}
    >
      <OrderTable>
        {orderList.map((order) => (
          <SupplierOrderItem
            order={order}
            onStatusChange={handleStatusChange(order.id)}
          />
        ))}
      </OrderTable>
      <InfoSnackbar
        text={snackbarText}
        setText={setSnackbarText}
        severity="error"
      />
    </BasicPaper>
  );
};

export default SupplierOrderTableScreen;
