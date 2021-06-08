import { Box, Paper } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from '../../Unknown/Navbar';
import DropshipperListScreen from '../DropshipperListScreen';
import PaymentTableScreen from '../PaymentTableScreen';
import ProductEditScreen from '../ProductEditScreen';
import SupplierOrderTableScreen from '../SupplierOrderTableScreen';
import SupplierProductListScreen from '../SupplierProductListScreen';
import NewslettersScreen from './../NewslettersScreen/index';
import ProductAddScreen from './../ProductAddScreen/index';

const SupplierRoot: React.FC = () => {
  const tabList = [
    { label: 'Product list', link: '/' },
    { label: 'Users', link: '/users' },
    { label: 'Orders', link: '/orders' },
    { label: 'Payments', link: '/payments' },
    { label: 'Newsletters', link: '/newsletters' },
  ];

  return (
    <>
      <Navbar tabList={tabList} />
      <Box my={2}>
        <Paper elevation={4}>
          <Box p={4}>
            <Switch>
              <Route exact path="/" component={SupplierProductListScreen} />
              <Route exact path="/users" component={DropshipperListScreen} />
              <Route exact path="/payments" component={PaymentTableScreen} />
              <Route exact path="/newsletters" component={NewslettersScreen} />
              <Route
                exact
                path="/orders"
                component={SupplierOrderTableScreen}
              />
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
