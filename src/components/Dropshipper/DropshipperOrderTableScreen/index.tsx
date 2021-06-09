import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import errorToString from '../../../common/errorToString';
import { Order, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import OrderTable from '../../Common/OrderTable';
import BasicPaper from '../../Unknown/BasicPaper';
import InfoSnackbar from '../../Unknown/InfoSnackbar';
import DropshipperOrderItem from './../DropshipperOrderItem/index';

const DropshipperOrderTableScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { supplierId } = useParams<{ supplierId: string }>();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const [orderList, setOrderList] = React.useState<Array<Order>>([]);
  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      setSnackbarText('');
      setLoading(true);
      try {
        const response: any = await dispatch(
          sendRequest('get', `/orders/my`, null, {
            supplier_setting_id: supplierId,
            dropshipper_setting_id: currentUser?.dropshipper_setting?.id,
          }),
        );
        setOrderList((response?.data || []) as Array<Order>);
      } catch (e) {
        setSnackbarText(errorToString(e));
      }
      setLoading(false);
    };
    fetchData();
  }, [currentUser, dispatch, supplierId]);

  return (
    <BasicPaper title="Orders" subtitle="Order history" loading={loading}>
      <OrderTable>
        {orderList.map((order) => (
          <DropshipperOrderItem order={order} />
        ))}
      </OrderTable>
      <InfoSnackbar text={snackbarText} setText={setSnackbarText} />
    </BasicPaper>
  );
};

export default DropshipperOrderTableScreen;
