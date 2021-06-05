import { AppBar, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

const SupplierNavbar: React.FC = () => {
  const history = useHistory();

  const tabList = [
    { label: 'Suppliers', link: '/' },
    { label: 'v1', link: '/v1' },
    { label: 'v2', link: '/v2' },
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
