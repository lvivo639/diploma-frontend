import { IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropshipperSetting, RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import BasicPaper from '../../Unknown/BasicPaper';
import InfoSnackbar from '../../Unknown/InfoSnackbar';
import errorToString from './../../../common/errorToString';
import useStyles from './useStyles';

const DropshipperListScreen: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const [dropshipperList, setDropshipperList] = React.useState<
    Array<DropshipperSetting>
  >([]);
  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  React.useEffect(() => {
    const fetchData = async () => {
      setSnackbarText('');
      try {
        setLoading(true);
        const response: any = await dispatch(
          sendRequest(
            'get',
            `/supplier-settings/users/${currentUser?.supplier_setting?.id}`,
          ),
        );

        setDropshipperList((response.data || []) as Array<DropshipperSetting>);
      } catch (e) {
        setSnackbarText(errorToString(e));
      }
      setLoading(false);
    };
    fetchData();
  }, [currentUser, dispatch]);

  const handleRemoveUser = async (dropshipper_setting_id: number) => {
    setSnackbarText('');
    try {
      setLoading(true);
      await dispatch(
        sendRequest(
          'delete',
          `/supplier-settings/removeUser/${dropshipper_setting_id}`,
        ),
      );

      const response: any = await dispatch(
        sendRequest(
          'get',
          `/supplier-settings/users/${currentUser?.supplier_setting?.id}`,
        ),
      );

      setDropshipperList((response.data || []) as Array<DropshipperSetting>);
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
    setLoading(false);
  };

  return (
    <BasicPaper
      title="Users with access"
      subtitle="You can remove user just clicked on bucket icon"
      loading={loading}
    >
      {dropshipperList.length ? (
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
                    <IconButton
                      onClick={() => handleRemoveUser(dropshipper.id)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          Your user list is empty. Share your invite link to give access to your
          product list.
        </>
      )}
      <InfoSnackbar
        text={snackbarText}
        setText={setSnackbarText}
        severity="error"
      />
    </BasicPaper>
  );
};

export default DropshipperListScreen;
