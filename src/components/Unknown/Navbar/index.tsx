import { AppBar, Box, Button, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { resetAuthState } from '../../../store/auth';
import { resetUserState } from '../../../store/user';

type NavbarProps = {
  tabList: Array<{ label: string; link: string }>;
};

const Navbar: React.FC<NavbarProps> = ({ tabList }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [currentValue, setCurrentValue] = React.useState('/');

  const onChange = (event: React.ChangeEvent<{}>, value: any) => {
    history.push(value);
    setCurrentValue(value);
  };

  const onLogout = async () => {
    await dispatch(resetUserState());
    await dispatch(resetAuthState());
  };

  return (
    <AppBar position="static">
      <Box display="flex" justifyContent="space-between">
        <Tabs value={currentValue} onChange={onChange}>
          {tabList.map((tab) => (
            <Tab label={tab.label} key={tab.label} value={tab.link} />
          ))}
        </Tabs>
        <Button onClick={onLogout}>Log out</Button>
      </Box>
    </AppBar>
  );
};

export default Navbar;
