import { Box, Paper } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from '../../Unknown/Navbar';
import ProductEditScreen from '../ProductEditScreen';
import SupplierProductListScreen from '../SupplierProductListScreen';
import ProductAddScreen from './../ProductAddScreen/index';

const SupplierRoot: React.FC = () => {
  const tabList = [{ label: 'Product list', link: '/' }];

  return (
    <>
      <Navbar tabList={tabList} />
      <Box my={2}>
        <Paper elevation={4}>
          <Box p={2}>
            <Switch>
              <Route exact path="/" component={SupplierProductListScreen} />
              <Route exact path="/products/add" component={ProductAddScreen} />
              <Route exact path="/products/:id" component={ProductEditScreen} />
              <Route path="*" component={() => <Redirect to="/" />} />
            </Switch>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default SupplierRoot;
