import {
  Box,
  Button,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import errorToString from '../../../common/errorToString';
import { Payment, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import BasicPaper from '../../Unknown/BasicPaper';
import InfoSnackbar from '../../Unknown/InfoSnackbar';
import useStyles from './useStyles';

const BalanceScreen: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [amount, setAmount] = React.useState<number>(0);
  const [balance, setBalance] = React.useState<string | number>('Loading...');
  const [paymentList, setPaymentList] = React.useState<Array<Payment>>([]);

  const [loading, setLoading] = React.useState(false);

  const [snackbarText, setSnackbarText] = React.useState('');
  const { supplierId } = useParams<{ supplierId: string }>();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const onAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (0 < newValue || newValue <= balance) {
      setAmount(newValue);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      setSnackbarText('');
      setLoading(true);
      try {
        const payments: any = await dispatch(
          sendRequest('get', `/payments/myPayments`, null, {
            supplier_setting_id: supplierId,
            dropshipper_setting_id: currentUser?.dropshipper_setting?.id,
          }),
        );
        setPaymentList((payments?.data || []) as Array<Payment>);

        const balanceResponse: any = await dispatch(
          sendRequest('get', `/dropshipper-settings/balance`, null, {
            supplier_setting_id: supplierId,
            dropshipper_setting_id: currentUser?.dropshipper_setting?.id,
          }),
        );
        setBalance((balanceResponse?.data || []) as number);
      } catch (e) {
        setSnackbarText(errorToString(e));
      }
      setLoading(false);
    };
    fetchData();
  }, [currentUser?.dropshipper_setting?.id, dispatch, supplierId]);

  const handleAmountSubmit = async () => {
    if (amount > balance || amount < 1) {
      setSnackbarText('Amount cannot be more than balance');
      return;
    }

    setLoading(true);
    setSnackbarText('');
    try {
      await dispatch(
        sendRequest('post', `/payments/paymentRequest`, null, {
          supplier_setting_id: supplierId,
          dropshipper_setting_id: currentUser?.dropshipper_setting?.id,
          amount: amount,
        }),
      );

      const payments: any = await dispatch(
        sendRequest('get', `/payments/myPayments`, null, {
          supplier_setting_id: supplierId,
          dropshipper_setting_id: currentUser?.dropshipper_setting?.id,
        }),
      );
      setPaymentList((payments?.data || []) as Array<Payment>);

      const balanceResponse: any = await dispatch(
        sendRequest('get', `/dropshipper-settings/balance`, null, {
          supplier_setting_id: supplierId,
          dropshipper_setting_id: currentUser?.dropshipper_setting?.id,
        }),
      );
      setBalance((balanceResponse?.data || []) as number);
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
    setAmount(0);
    setLoading(false);
  };

  return (
    <BasicPaper
      title={`Your Balance: ${balance} UAH`}
      subtitle="Payment requests history. Here you also can create new one"
      loading={loading}
    >
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <TextField
            value={amount}
            label="Payment request"
            type="number"
            variant="outlined"
            onChange={onAmountChange}
          />
          <Box mt={2}>
            <Button variant="outlined" onClick={handleAmountSubmit}>
              Create
            </Button>
          </Box>
        </Box>
        {paymentList.length ? (
          <TableContainer component={Paper} className={classes.tableRoot}>
            <TableContainer aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Payment Date</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentList.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell component="th" scope="row">
                      {payment.id}
                    </TableCell>
                    <TableCell
                      className={
                        payment.paymentDateTime ? classes.paid : classes.notPaid
                      }
                    >
                      {payment.paymentDateTime
                        ? format(
                            parseISO(payment.paymentDateTime),
                            'dd/MM/yyyy HH:mm',
                          )
                        : 'Not paid'}
                    </TableCell>

                    <TableCell>{payment.amount} UAH</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContainer>
          </TableContainer>
        ) : (
          <>Your payment history is empty</>
        )}
      </Box>
      <InfoSnackbar
        text={snackbarText}
        setText={setSnackbarText}
        severity="error"
      />
    </BasicPaper>
  );
};

export default BalanceScreen;
