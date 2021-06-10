import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Payment, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import BasicPaper from '../../Unknown/BasicPaper';
import InfoSnackbar from '../../Unknown/InfoSnackbar';
import PaymentItem from '../PaymentItem';
import errorToString from './../../../common/errorToString';
import useStyles from './useStyles';

const PaymentTableScreen: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const [paymentList, setPaymentList] = React.useState<Array<Payment>>([]);
  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      setSnackbarText('');
      try {
        setLoading(true);
        const response: any = await dispatch(
          sendRequest('get', `/supplier-settings/payments`),
        );

        setPaymentList((response.data || []) as Array<Payment>);
      } catch (e) {
        setSnackbarText(errorToString(e));
      }
      setLoading(false);
    };
    fetchData();
  }, [currentUser, dispatch]);

  const handlePaidChange = (id: number) => async (value: boolean) => {
    setSnackbarText('');
    try {
      await dispatch(
        sendRequest('post', `/supplier-settings/changePaymentStatus/${id}`),
      );

      const response: any = await dispatch(
        sendRequest('get', `/supplier-settings/payments`),
      );

      setPaymentList((response.data || []) as Array<Payment>);
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
  };

  return (
    <BasicPaper
      title="Payment requests"
      subtitle="Check 'paid' only after money was sent"
      loading={loading}
    >
      <TableContainer component={Paper} className={classes.tableRoot}>
        <TableContainer aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Card Number</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paymentList.map((payment) => (
              <PaymentItem
                payment={payment as Payment}
                key={payment.id}
                onPaidChange={handlePaidChange(payment.id as number)}
              />
            ))}
          </TableBody>
        </TableContainer>
      </TableContainer>
      <InfoSnackbar
        text={snackbarText}
        setText={setSnackbarText}
        severity="error"
      />
    </BasicPaper>
  );
};

export default PaymentTableScreen;
