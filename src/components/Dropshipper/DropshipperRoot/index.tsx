import { Box } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from '../../Unknown/Navbar';
import CartScreen from '../CartScreen';
import DropshipperProductListScreen from '../DropshipperProductListScreen';
import OrderListScreen from '../OrderListScreen';
import OrderScreen from '../OrderScreen';
import AcceptInvitationScreen from './../AcceptInvitationScreen/index';
import SupplierListScreen from './../SupplierListScreen/index';

const DropshipperRoot: React.FC = () => {
  const [supplierId, setSupplierId] = React.useState<number | undefined>();

  if (supplierId === undefined)
    return (
      <>
        <Navbar tabList={[]} disableProfile />
        <Box bgcolor="#efefef" p={3.5} minHeight="100vh" boxSizing="border-box">
          <Box p={2}>
            <Switch>
              <Route
                exact
                path="/invite/:inviteCode"
                component={AcceptInvitationScreen}
              />
              <Route
                exact
                path="/"
                component={() => (
                  <SupplierListScreen setSupplierId={setSupplierId} />
                )}
              />
              <Route path="*" component={() => <Redirect to="/" />} />
            </Switch>
          </Box>
        </Box>
      </>
    );

  const tabList = [
    { label: 'Suppliers', link: '/', onClick: () => setSupplierId(undefined) },
    { label: 'Products', link: `/supplier/${supplierId}` },
    { label: 'Cart', link: `/supplier/${supplierId}/cart` },
    { label: 'My orders', link: `/supplier/${supplierId}/myOrders` },
  ];

  return (
    <>
      <Navbar tabList={tabList} />
      <Box bgcolor="#efefef" p={3.5} minHeight="100vh" boxSizing="border-box">
        <Box p={2}>
          <Switch>
            <Route
              exact
              path="/supplier/:supplierId/myOrders"
              component={OrderListScreen}
            />
            <Route
              exact
              path="/supplier/:supplierId/cart/order"
              component={OrderScreen}
            />
            <Route
              exact
              path="/supplier/:supplierId/cart"
              component={CartScreen}
            />
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
            <Route
              exact
              path="/"
              component={() => (
                <SupplierListScreen setSupplierId={setSupplierId} />
              )}
            />
            <Route
              path="*"
              component={() => (
                <Redirect
                  to={
                    supplierId !== undefined ? '/' : `/supplier/${supplierId}`
                  }
                />
              )}
            />
          </Switch>
        </Box>
      </Box>
    </>
  );
};

export default DropshipperRoot;
