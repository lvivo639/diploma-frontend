import { Box, CircularProgress, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { sendRequest } from '../../../store/auth';
import PasswordSettingsForm from '../../Common/PasswordSettingsForm';
import { PasswordFormikProps } from '../../Common/PasswordSettingsForm/types';
import InfoSnackbar from '../../Unknown/InfoSnackbar';
import errorToString from './../../../common/errorToString';

const PasswordSettings: React.FC = () => {
  const initialValues: PasswordFormikProps = {
    password: '',
    newPassword: '',
    passwordConfirm: '',
  };

  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');
  const dispatch = useDispatch();

  const onPasswordSettingsSubmit = async (values: PasswordFormikProps) => {
    setLoading(true);
    setSnackbarText('');
    try {
      await dispatch(sendRequest('post', `/user/changePassword`, values));
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
          <Typography variant="h5">Password settings</Typography>
          <PasswordSettingsForm
            onSubmit={onPasswordSettingsSubmit}
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

export default PasswordSettings;
