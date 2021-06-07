import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
} from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../common/types';
import { resetAuthState } from '../../../store/auth';
import { resetUserState } from '../../../store/user';

type NavbarProps = {
  tabList: Array<{ label: string; link: string; onClick?: () => void }>;
  onProfileClick?: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ tabList, onProfileClick }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [currentValue, setCurrentValue] = React.useState('/');
  const { currentUser } = useSelector((state: RootState) => state.user);

  const onChange = (event: React.ChangeEvent<{}>, value: any) => {
    const selectedTab = tabList.find((tab) => tab.link === value);
    if (selectedTab && selectedTab.onClick) {
      selectedTab.onClick();
    }
    history.push(value);
    setCurrentValue(value);
  };

  const handleProfileClick = () => {
    handleClose();
    if (onProfileClick) onProfileClick();

    history.push('/profile');
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
        <Box pr={2} display="flex" alignItems="center">
          <Button onClick={handleClick} color="inherit">
            {currentUser?.username}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Navbar;
