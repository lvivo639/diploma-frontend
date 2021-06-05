import { CircularProgress, Grid } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, SupplierSetting } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import SupplierCard from './../SupplierCard/index';

const SupplierListScreen: React.FC = () => {
  const dispatch = useDispatch();

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
        response.data?.['supplier_settings'] || ([] as Array<SupplierSetting>),
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
              <SupplierCard supplier={supplier} key={supplier.id} />
            </Grid>
          ))}
        </>
      ) : (
        <>
          Your list is empty. You need to accept invitation to get access to
          supplier storage
        </>
      )}
    </Grid>
  );
};

export default SupplierListScreen;
