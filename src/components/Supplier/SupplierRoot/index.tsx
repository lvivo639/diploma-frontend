import { Box } from '@material-ui/core';
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
      <Box bgcolor="#efefef" p={3.5} minHeight="100vh" boxSizing="border-box">
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
};

export default SupplierRoot;
