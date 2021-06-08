import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/types';
import PasswordSettingsForm from '../../Common/PasswordSettingsForm';
import { PasswordFormikProps } from '../../Common/PasswordSettingsForm/types';
import UserSettingsForm from '../../Common/UserSettingsForm';
import { UserFormikProps } from '../../Common/UserSettingsForm/types';
import BasicPaper from '../../Unknown/BasicPaper';
import DropshipperSettingsForm from '../DropshipperSettingsForm/index';
import { DropshipperSettingsFormikProps } from '../DropshipperSettingsForm/types';
import useStyles from './useStyles';

const DropshipperProfileScreen: React.FC = () => {
  const classes = useStyles();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const onUserSettingsSubmit = async (values: UserFormikProps) => {
    console.log(values);
  };

  const onPasswordSettingsSubmit = async (values: PasswordFormikProps) => {
    console.log(values);
  };

  const onDropshipperSettingsSubmit = async (
    values: DropshipperSettingsFormikProps,
  ) => {
    console.log(values);
  };

  return (
    <BasicPaper title="Profile" subtitle="Settings you can change">
      <Box m={4}>
        <Paper classes={{ root: classes.paperRoot }}>
          <Typography variant="h5">User profile settings</Typography>
          <UserSettingsForm onSubmit={onUserSettingsSubmit} />
        </Paper>
      </Box>
      <Box m={4}>
        <Paper classes={{ root: classes.paperRoot }}>
          <Typography variant="h5">Password settings</Typography>
          <PasswordSettingsForm onSubmit={onPasswordSettingsSubmit} />
        </Paper>
      </Box>
      {currentUser?.dropshipper_setting && (
        <Box m={4}>
          <Paper classes={{ root: classes.paperRoot }}>
            <Typography variant="h5">Dropdhipper settings</Typography>
            <DropshipperSettingsForm
              onSubmit={onDropshipperSettingsSubmit}
              dropshippersSettings={currentUser?.dropshipper_setting}
            />
          </Paper>
        </Box>
      )}
    </BasicPaper>
  );
};

export default DropshipperProfileScreen;
