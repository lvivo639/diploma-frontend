import { Box } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ProductEditScreen from '../ProductEditScreen';
import SupplierProductListScreen from '../SupplierProductListScreen';
import ProductAddScreen from './../ProductAddScreen/index';
import SupplierNavbar from './../SupplierNavbar';

const SupplierRoot: React.FC = () => (
  <>
    <SupplierNavbar />
    <Box bgcolor="grey.500" p={3.5} minHeight="100vh" boxSizing="border-box">
      <Box p={2}>
        <Switch>
          <Route exact path="/" component={SupplierProductListScreen} />
          <Route exact path="/products/add" component={ProductAddScreen} />
          <Route exact path="/products/:id" component={ProductEditScreen} />
          <Route path="*" component={() => <Redirect to="/" />} />
        </Switch>
      </Box>
    </Box>
  </>
);

export default SupplierRoot;
