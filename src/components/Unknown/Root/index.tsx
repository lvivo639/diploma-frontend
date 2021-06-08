import { CircularProgress, Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/types';
import DropshipperRoot from '../../Dropshipper/DropshipperRoot';
import SupplierRoot from '../../Supplier/SupplierRoot';
import ErrorScreen from '../ErrorScreen';
import GuestRoot from '../GuestRoot';
import dropshipperTheme from './dropshipperTheme';
import supplierTheme from './supplierTheme';

const Root: React.FC = () => {
  const { currentUser, isLoading, error } = useSelector(
    (state: RootState) => state.user,
  );

  if (error) return <ErrorScreen text={error} />;

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="lg">
      {currentUser?.role?.type === 'dropshipper' ? (
        <ThemeProvider theme={dropshipperTheme}>
          <DropshipperRoot />
        </ThemeProvider>
      ) : currentUser?.role?.type === 'supplier' ? (
        <ThemeProvider theme={supplierTheme}>
          <SupplierRoot />
        </ThemeProvider>
      ) : (
        <GuestRoot />
      )}
    </Container>
  );
};

export default Root;
