import { Box } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import EmptyScreen from '../../Unknown/EmptyScreen';
import DropshipperNavbar from '../DropshipperNavbar';
import AcceptInvitationScreen from './../AcceptInvitationScreen/index';
import SupplierListScreen from './../SupplierListScreen/index';

const DropshipperRoot: React.FC = () => (
  <>
    <DropshipperNavbar />
    <Box bgcolor="grey.500" p={3.5} minHeight="100vh" boxSizing="border-box">
      <Box p={2}>
        <Switch>
          <Route
            exact
            path="/supplier/:id"
            component={() => <EmptyScreen text={'supplier'} />}
          />
          <Route
            exact
            path="/invite/:inviteCode"
            component={AcceptInvitationScreen}
          />
          <Route exact path="/" component={SupplierListScreen} />
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
      </Box>
    </Box>
  </>
);

export default DropshipperRoot;
