import { Box, CircularProgress, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import { getCurrentUser } from '../../../store/user';
import UserSettingsForm from '../../Common/UserSettingsForm';
import { UserFormikProps } from '../../Common/UserSettingsForm/types';
import InfoSnackbar from '../../Unknown/InfoSnackbar';
import errorToString from './../../../common/errorToString';

const UserSettings: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const initialValues: UserFormikProps = {
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
  };

  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');
  const dispatch = useDispatch();

  const onUserSettingsSubmit = async (values: UserFormikProps) => {
    setLoading(true);
    setSnackbarText('');
    try {
      await dispatch(sendRequest('post', `/user/settings`, values));
      await dispatch(getCurrentUser());
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
    setLoading(false);
  };

  if (loading) return <CircularProgress />;

  return (
    <Box m={4}>
      <Paper>
        <Box p={3}>
          <Typography variant="h5">User profile settings</Typography>
          <UserSettingsForm
            onSubmit={onUserSettingsSubmit}
            initialValues={initialValues}
          />
        </Box>
      </Paper>
      <InfoSnackbar
        text={snackbarText}
        setText={setSnackbarText}
        severity="error"
      />
    </Box>
  );
};

export default UserSettings;
