import { Box, CircularProgress, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import { getCurrentUser } from '../../../store/user';
import PasswordSettings from '../../Common/PasswordSettings';
import UserSettings from '../../Common/UserSettings';
import BasicPaper from '../../Unknown/BasicPaper';
import InfoSnackbar from '../../Unknown/InfoSnackbar';
import { SupplierSettingsFormikProps } from '../SupplierSettingsForm/types';
import errorToString from './../../../common/errorToString';
import SupplierSettingsForm from './../SupplierSettingsForm/index';

const SupplierProfileScreen: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const [loadingForm, setLoadingForm] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');
  const dispatch = useDispatch();

  const handleSupplierSettingsSubmit = async (
    values: SupplierSettingsFormikProps,
  ) => {
    setLoadingForm(true);
    setSnackbarText('');
    try {
      await dispatch(
        sendRequest('post', `/supplier-settings/settings`, values),
      );
      await dispatch(getCurrentUser());
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
    setLoadingForm(false);
  };

  const handleUniqueHashChange = async () => {
    return new Date().getTime().toString();
  };

  if (loadingForm) return <CircularProgress />;
  return (
    <BasicPaper title="Profile" subtitle="Settings you can change">
      <UserSettings />
      <PasswordSettings />
      {currentUser?.supplier_setting && (
        <Box m={4}>
          <Paper>
            <Box p={3}>
              <Typography variant="h5">Supplier settings</Typography>
              <SupplierSettingsForm
                supplierSettings={currentUser?.supplier_setting}
                onSubmit={handleSupplierSettingsSubmit}
                onUniqueHashChange={handleUniqueHashChange}
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

export default SupplierProfileScreen;
