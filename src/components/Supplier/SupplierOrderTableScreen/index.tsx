import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Order, OrderStatus, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import OrderTable from '../../Common/OrderTable';
import BasicPaper from '../../Unknown/BasicPaper';
import SupplierOrderItem from '../SupplierOrderItem/index';
import errorToString from './../../../common/errorToString';

const orderList1: Array<Order> = [
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
        sendRequest('post', `/supplier-settings/changeStatus/${id}`, null, {
          status,
        }),
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
    </BasicPaper>
  );
};

export default SupplierOrderTableScreen;
