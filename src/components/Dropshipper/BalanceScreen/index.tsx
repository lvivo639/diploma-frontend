import { Box, Button, TextField, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { format } from 'date-fns';
import React from 'react';
import { Payment } from '../../../common/types';
import useStyles from './useStyles';

const mockList: Array<Payment> = [
  {
    id: 1,
    paymentTime: 1623062138042,
    cost: 100,
  },
  {
    id: 1,
    paymentTime: undefined,
    cost: 100,
  },
  {
    id: 1,
    paymentTime: 1623062138042,
    cost: 1001,
  },
  {
    id: 1,
    paymentTime: 1623062138042,
    cost: 100,
  },
];

const BalanceScreen: React.FC = () => {
  const classes = useStyles();

  const balance = 1000;
  const [paymentReq, setPaymentReq] = React.useState<number | undefined>();
  const onPaymentRequestChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (Number(event.target.value) <= balance) {
      setPaymentReq(Number(event.target.value));
    }
  };
  return (
    <>
      <Box mb={4}>
        <Typography variant="h3">Your Balance: {balance} UAH</Typography>
        <Typography>
          Payment requests history. Here you also can create new one
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <TextField
            value={paymentReq}
            label="Payment request"
            type="number"
            variant="outlined"
            onChange={onPaymentRequestChange}
          />
          <Box mt={2}>
            <Button variant="outlined">Create</Button>
          </Box>
        </Box>
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
              {mockList.map((mock) => (
                <TableRow key={mock.id}>
                  <TableCell component="th" scope="row">
                    {mock.id}
                  </TableCell>
                  <TableCell
                    className={
                      mock.paymentTime ? classes.paid : classes.notPaid
                    }
                  >
                    {mock.paymentTime
                      ? format(mock.paymentTime, 'dd/MM/yyyy HH:mm')
                      : 'Not paid'}
                  </TableCell>

                  <TableCell>{mock.cost} UAH</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableContainer>
        </TableContainer>
      </Box>
    </>
  );
};

export default BalanceScreen;
