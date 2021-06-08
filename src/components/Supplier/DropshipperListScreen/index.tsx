import { Box, IconButton, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { DropshipperSetting } from '../../../common/types';
import useStyles from './useStyles';

//special request with user populate
const dropshipperList: Array<DropshipperSetting> = [
  {
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
  {
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
  {
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
  {
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
];

const DropshipperListScreen: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Box mb={2}>
        <Typography variant="h3">Users with access</Typography>
        <Typography>You can remove user just clicked on bucket icon</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Card Number</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>E-mail</TableCell>
              <TableCell>Telegram Username</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dropshipperList.map((dropshipper) => (
              <TableRow key={dropshipper.id}>
                <TableCell component="th" scope="row">
                  {dropshipper.id}
                </TableCell>
                <TableCell>
                  {dropshipper.users_permissions_user.firstName}{' '}
                  {dropshipper.users_permissions_user.lastName}
                </TableCell>
                <TableCell>
                  {dropshipper.users_permissions_user.username}
                </TableCell>
                <TableCell>{dropshipper.cardNumber}</TableCell>
                <TableCell>{dropshipper.phoneNumber}</TableCell>
                <TableCell>
                  {dropshipper.users_permissions_user.email}
                </TableCell>
                <TableCell>{dropshipper.telegramUsername}</TableCell>
                <TableCell>
                  <IconButton>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DropshipperListScreen;
