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

  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');
  const dispatch = useDispatch();

  const handleSupplierSettingsSubmit = async (
    values: SupplierSettingsFormikProps,
    image: any,
  ) => {
    setLoading(true);
    setSnackbarText('');
    try {
      await dispatch(
        sendRequest('post', `/supplier-settings/settings`, values),
      );

      if (image && currentUser?.supplier_setting?.id) {
        let formData = new FormData();
        formData.append('files', image);
        formData.append('ref', 'supplier-settings');
        formData.append('refId', currentUser.supplier_setting.id.toString());
        formData.append('field', 'header');

        await dispatch(
          sendRequest(
            'post',
            '/upload',
            formData,
            {},
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            },
          ),
        );
      }

      await dispatch(getCurrentUser());
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
    setLoading(false);
  };

  const handleUniqueHashChange = async () => {
    setSnackbarText('');
    try {
      await dispatch(
        sendRequest('post', `/supplier-settings/changeUniqueHash`),
      );
      await dispatch(getCurrentUser());
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
  };

  if (loading) return <CircularProgress />;
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
