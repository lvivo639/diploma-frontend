import { AppBar, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import messages from './messages';

const SupplierNavbar: React.FC = () => {
  const history = useHistory();
  const intl = useIntl();

  const tabList = [
    { label: intl.formatMessage(messages.productList), link: '/' },
    { label: intl.formatMessage(messages.v1), link: '/v1' },
    { label: intl.formatMessage(messages.v2), link: '/v2' },
  ];

  const [currentValue, setCurrentValue] = React.useState('/');

  const onChange = (event: React.ChangeEvent<{}>, value: any) => {
    history.push(value);
    setCurrentValue(value);
  };

  return (
    <AppBar position="static">
      <Tabs value={currentValue} onChange={onChange}>
        {tabList.map((tab) => (
          <Tab label={tab.label} key={tab.label} value={tab.link} />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default SupplierNavbar;
