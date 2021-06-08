import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/types';
import PasswordSettingsForm from '../../Common/PasswordSettingsForm';
import { PasswordFormikProps } from '../../Common/PasswordSettingsForm/types';
import UserSettingsForm from '../../Common/UserSettingsForm';
import { UserFormikProps } from '../../Common/UserSettingsForm/types';
import { SupplierSettingsFormikProps } from '../SupplierSettingsForm/types';
import SupplierSettingsForm from './../SupplierSettingsForm/index';
import useStyles from './useStyles';

const SupplierProfileScreen: React.FC = () => {
  const classes = useStyles();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const handleUserSettingsSubmit = async (values: UserFormikProps) => {
    console.log(values);
  };

  const handlePasswordSettingsSubmit = async (values: PasswordFormikProps) => {
    console.log(values);
  };

  const handleSupplierSettingsSubmit = async (
    values: SupplierSettingsFormikProps,
  ) => {
    console.log(values);
  };

  const handleUniqueHashChange = async () => {
    return new Date().getTime().toString();
  };

  return (
    <>
      <Box mb={4}>
        <Typography variant="h3">Profile</Typography>
        <Typography>Settings you can change</Typography>
      </Box>
      <Box m={4}>
        <Paper classes={{ root: classes.paperRoot }}>
          <Typography variant="h5">User profile settings</Typography>
          <UserSettingsForm onSubmit={handleUserSettingsSubmit} />
        </Paper>
      </Box>
      <Box m={4}>
        <Paper classes={{ root: classes.paperRoot }}>
          <Typography variant="h5">Password settings</Typography>
          <PasswordSettingsForm onSubmit={handlePasswordSettingsSubmit} />
        </Paper>
      </Box>
      {currentUser?.supplier_setting && (
        <Box m={4}>
          <Paper classes={{ root: classes.paperRoot }}>
            <Typography variant="h5">Dropdhipper settings</Typography>
            <SupplierSettingsForm
              supplierSettings={currentUser?.supplier_setting}
              onSubmit={handleSupplierSettingsSubmit}
              onUniqueHashChange={handleUniqueHashChange}
            />
          </Paper>
        </Box>
      )}
    </>
  );
};

export default SupplierProfileScreen;
