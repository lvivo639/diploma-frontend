import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/types';
import PasswordSettings from '../../Common/PasswordSettings';
import UserSettings from '../../Common/UserSettings';
import BasicPaper from '../../Unknown/BasicPaper';
import DropshipperSettingsForm from '../DropshipperSettingsForm/index';
import { DropshipperSettingsFormikProps } from '../DropshipperSettingsForm/types';

const DropshipperProfileScreen: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const onDropshipperSettingsSubmit = async (
    values: DropshipperSettingsFormikProps,
  ) => {
    console.log(values);
  };

  return (
    <BasicPaper title="Profile" subtitle="Settings you can change">
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
        </Box>
      )}
    </BasicPaper>
  );
};

export default DropshipperProfileScreen;
