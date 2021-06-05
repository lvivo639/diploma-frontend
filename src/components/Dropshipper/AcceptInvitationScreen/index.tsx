import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../common/types';
import { sendRequest } from '../../../store/auth';
import ErrorScreen from '../../Unknown/ErrorScreen';
import errorToString from './../../../common/errorToString';

const AcceptInvitationScreen: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { inviteCode } = useParams<{ inviteCode: string }>();

  const { currentUser } = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: any = await dispatch(
          sendRequest('post', `/invite/${inviteCode}`),
        );
        setLoading(false);
        history.push(`/supplier/${response.data}`);
      } catch (e) {
        setLoading(false);
        setError(errorToString(e));
      }
    };
    fetchData();
  }, [currentUser, dispatch, history, inviteCode]);

  if (loading) return <CircularProgress />;

  if (error) return <ErrorScreen text={error} />;

  return <></>;
};

export default AcceptInvitationScreen;
