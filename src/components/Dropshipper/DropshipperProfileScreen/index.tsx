import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import { getCurrentUser } from '../../../store/user';
import PasswordSettings from '../../Common/PasswordSettings';
import UserSettings from '../../Common/UserSettings';
import BasicPaper from '../../Unknown/BasicPaper';
import InfoSnackbar from '../../Unknown/InfoSnackbar';
import DropshipperSettingsForm from '../DropshipperSettingsForm/index';
import { DropshipperSettingsFormikProps } from '../DropshipperSettingsForm/types';
import errorToString from './../../../common/errorToString';

const DropshipperProfileScreen: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');
  const dispatch = useDispatch();

  const onDropshipperSettingsSubmit = async (
    values: DropshipperSettingsFormikProps,
  ) => {
    setLoading(true);
    setSnackbarText('');
    try {
      await dispatch(
        sendRequest('post', `/dropshipper-settings/settings`, values),
      );
      await dispatch(getCurrentUser());
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
    setLoading(false);
  };

  return (
    <BasicPaper
      title="Profile"
      subtitle="Settings you can change"
      loading={loading}
    >
      <UserSettings />
      <PasswordSettings />
      {currentUser?.dropshipper_setting && (
        <Box m={4}>
          <Paper>
            <Box p={3}>
              <Typography variant="h5">Dropshipper settings</Typography>
              <DropshipperSettingsForm
                onSubmit={onDropshipperSettingsSubmit}
                dropshippersSettings={currentUser?.dropshipper_setting}
              />
            </Box>
          </Paper>
          <InfoSnackbar
            text={snackbarText}
            setText={setSnackbarText}
            severity="error"
          />
        </Box>
      )}
    </BasicPaper>
  );
};

export default DropshipperProfileScreen;
