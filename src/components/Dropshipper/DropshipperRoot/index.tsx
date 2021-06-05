import { Box } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from '../../Unknown/Navbar';
import DropshipperProductListScreen from '../DropshipperProductListScreen';
import AcceptInvitationScreen from './../AcceptInvitationScreen/index';
import SupplierListScreen from './../SupplierListScreen/index';

const DropshipperRoot: React.FC = () => {
  const tabList = [{ label: 'Suppliers', link: '/' }];

  return (
    <>
      <Navbar tabList={tabList} />
      <Box bgcolor="#efefef" p={3.5} minHeight="100vh" boxSizing="border-box">
        <Box p={2}>
          <Switch>
            <Route
              exact
              path="/supplier/:supplierId"
              component={DropshipperProductListScreen}
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
};

export default DropshipperRoot;
