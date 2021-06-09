import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import formatISO from 'date-fns/formatISO';
import React from 'react';
import { Payment } from '../../../common/types';
import BasicPaper from '../../Unknown/BasicPaper';
import PaymentItem from '../PaymentItem';
import useStyles from './useStyles';

const paymentList: Array<Partial<Payment>> = [
  {
    id: 1,
    paymentDateTime: '2018-04-23T10:26:00.996Z',
    amount: 100,
    dropshipper_setting: {
      id: 1,
      telegramUsername: '111',
      phoneNumber: '111',
      cardNumber: '111',
      users_permissions_user: {
        id: 1,
        firstName: 'aaaaa',
        lastName: 'aaaaa',
        username: 'aaaaa',
        email: 'aaaaa',
        role: {
          name: 'a',
          type: 'a',
        },
        created_at: 'aaaaa',
      },
      supplier_settings: [],
    },
  },
  {
    id: 1,
    paymentDateTime: '2018-04-23T10:26:00.996Z',
    amount: 100,
    dropshipper_setting: {
      id: 1,
      telegramUsername: '111',
      phoneNumber: '111',
      cardNumber: '111',
      users_permissions_user: {
        id: 1,
        firstName: 'aaaaa',
        lastName: 'aaaaa',
        username: 'aaaaa',
        email: 'aaaaa',
        role: {
          name: 'a',
          type: 'a',
        },
        created_at: 'aaaaa',
      },
      supplier_settings: [],
    },
  },
  {
    id: 1,
    paymentDateTime: '2018-04-23T10:26:00.996Z',
    amount: 1001,
    dropshipper_setting: {
      id: 1,
      telegramUsername: '111',
      phoneNumber: '111',
      cardNumber: '111',
      users_permissions_user: {
        id: 1,
        firstName: 'aaaaa',
        lastName: 'aaaaa',
        username: 'aaaaa',
        email: 'aaaaa',
        role: {
          name: 'a',
          type: 'a',
        },
        created_at: 'aaaaa',
      },
      supplier_settings: [],
    },
  },
  {
    id: 1,
    paymentDateTime: '2018-04-23T10:26:00.996Z',
    amount: 100,
    dropshipper_setting: {
      id: 1,
      telegramUsername: '111',
      phoneNumber: '111',
      cardNumber: '111',
      users_permissions_user: {
        id: 1,
        firstName: 'aaaaa',
        lastName: 'aaaaa',
        username: 'aaaaa',
        email: 'aaaaa',
        role: {
          name: 'a',
          type: 'a',
        },
        created_at: 'aaaaa',
      },
      supplier_settings: [],
    },
  },
];

const PaymentTableScreen: React.FC = () => {
  const classes = useStyles();
  const handlePaidChange = (id: number) => async (value: boolean) => {
    return value ? formatISO(new Date()) : undefined;
  };
  return (
    <BasicPaper
      title="Payment requests"
      subtitle="Check 'paid' only after money was sent"
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
    </BasicPaper>
  );
};

export default PaymentTableScreen;
