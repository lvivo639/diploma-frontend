import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TableCell,
  TableRow,
} from '@material-ui/core';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import React from 'react';
import { Payment } from '../../../common/types';
import useStyles from './useStyles';

type PaymentItemProps = {
  payment: Payment;
  onPaidChange: (value: boolean) => Promise<string | undefined>; // ISO string | undeifned
};

const PaymentItem: React.FC<PaymentItemProps> = ({ payment, onPaidChange }) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [paymentDateTime, setPaymentDateTime] = React.useState<
    string | undefined
  >(payment.paymentDateTime);

  const handlePaymentDateTimeChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoading(true);
    const dateTime = await onPaidChange(e.target.checked);
    setPaymentDateTime(dateTime);
    setLoading(false);
  };

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {payment.id}
      </TableCell>
      <TableCell className={paymentDateTime ? classes.paid : classes.notPaid}>
        {loading ? (
          <CircularProgress />
        ) : (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!paymentDateTime}
                onChange={handlePaymentDateTimeChange}
              />
            }
            label={
              paymentDateTime
                ? format(parseISO(paymentDateTime), 'dd/MM/yyyy HH:mm')
                : 'Not paid'
            }
          />
        )}
      </TableCell>
      <TableCell>{payment.amount} UAH</TableCell>
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
