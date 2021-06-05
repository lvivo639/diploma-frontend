import { CircularProgress, Container } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../common/types';
import DropshipperRoot from '../../Dropshipper/DropshipperRoot';
import SupplierRoot from '../../Supplier/SupplierRoot';
import ErrorScreen from '../ErrorScreen';
import GuestRoot from '../GuestRoot';

const Root: React.FC = () => {
  const { currentUser, isLoading, error } = useSelector(
    (state: RootState) => state.user,
  );

  if (error) return <ErrorScreen text={error} />;

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxWidth="lg">
      {currentUser?.role?.type === 'dropshipper' ? (
        <DropshipperRoot />
      ) : currentUser?.role?.type === 'supplier' ? (
        <SupplierRoot />
      ) : (
        <GuestRoot />
      )}
    </Container>
  );
};

export default Root;
