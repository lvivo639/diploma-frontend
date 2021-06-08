import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TableCell,
  TableRow,
} from '@material-ui/core';
import format from 'date-fns/format';
import React from 'react';
import { Payment } from '../../../common/types';
import useStyles from './useStyles';

type PaymentItemProps = {
  payment: Payment;
  onPaidChange: (value: boolean) => Promise<number>; // time | -1
};

const PaymentItem: React.FC<PaymentItemProps> = ({ payment, onPaidChange }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [paymentTime, setPaymentTime] = React.useState<number>(
    payment.paymentTime,
  );

  const handlePaymentTimeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoading(true);
    const time = await onPaidChange(e.target.checked);
    setPaymentTime(time);
    setLoading(false);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {payment.id}
      </TableCell>
      <TableCell
        className={paymentTime !== -1 ? classes.paid : classes.notPaid}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <FormControlLabel
            control={
              <Checkbox
                checked={paymentTime !== -1}
                onChange={handlePaymentTimeChange}
              />
            }
            label={
              paymentTime !== -1
                ? format(paymentTime, 'dd/MM/yyyy HH:mm')
                : 'Not paid'
            }
          />
        )}
      </TableCell>
      <TableCell>{payment.cost} UAH</TableCell>
      <TableCell>
        {payment.dropshipper_setting.users_permissions_user.firstName}{' '}
        {payment.dropshipper_setting.users_permissions_user.lastName}{' '}
      </TableCell>
      <TableCell>{payment.dropshipper_setting.cardNumber}</TableCell>
      <TableCell>{payment.dropshipper_setting.phoneNumber}</TableCell>
    </TableRow>
  );
};

export default PaymentItem;
