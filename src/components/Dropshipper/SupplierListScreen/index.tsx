import { CircularProgress, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState, SupplierSetting } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import SupplierCard from './../SupplierCard/index';

type SupplierListScreenProps = {
  setSupplierId: (id: number) => void;
};

const SupplierListScreen: React.FC<SupplierListScreenProps> = ({
  setSupplierId,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const [supplierList, setSupplierList] = React.useState<
    Array<SupplierSetting>
  >([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response: any = await dispatch(
        sendRequest(
          'get',
          `/dropshipper-settings/${currentUser?.dropshipper_setting?.id}`,
        ),
      );
      setSupplierList(
        (response.data?.['supplier_settings'] || []) as Array<SupplierSetting>,
      );
      setLoading(false);
    };
    fetchData();
  }, [currentUser, dispatch]);

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={2} justify="center">
      {supplierList.length ? (
        <>
          {supplierList.map((supplier) => (
            <Grid item>
              <SupplierCard
                supplier={supplier}
                key={supplier.id}
                onSupplierClick={() => {
                  setSupplierId(supplier.id);
                  history.push(`/supplier/${supplier.id}`);
                }}
              />
            </Grid>
          ))}
        </>
      ) : (
        <Typography>
          Your list is empty. You need to accept invitation to get access to
          supplier storage
        </Typography>
      )}
    </Grid>
  );
};

export default SupplierListScreen;
